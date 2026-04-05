import type { OpenAPIV3 } from 'openapi-types';
import type { OperationDefinition } from '../types';

/**
 * Schema 引用分析結果
 */
export interface SchemaRefAnalysis {
  /** 被多個 group 共用的 schema 名稱 */
  sharedSchemas: Set<string>;
  /** 每個 group 專屬的 schema 名稱 */
  groupLocalSchemas: Map<string, Set<string>>;
  /** 完全未被引用的 schema 名稱 */
  unusedSchemas: Set<string>;
}

/**
 * 從 OpenAPI schema 物件中遞迴收集所有 $ref 引用的 schema 名稱
 */
function collectRefsFromSchema(schema: any, refs: Set<string>): void {
  if (!schema || typeof schema !== 'object') return;

  if (schema.$ref && typeof schema.$ref === 'string') {
    const match = schema.$ref.match(/^#\/components\/schemas\/(.+)$/);
    if (match) {
      refs.add(match[1]);
    }
  }

  // 遍歷所有屬性
  if (schema.properties) {
    for (const prop of Object.values(schema.properties)) {
      collectRefsFromSchema(prop, refs);
    }
  }

  // array items
  if (schema.items) {
    collectRefsFromSchema(schema.items, refs);
  }

  // additionalProperties
  if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
    collectRefsFromSchema(schema.additionalProperties, refs);
  }

  // allOf / oneOf / anyOf
  for (const key of ['allOf', 'oneOf', 'anyOf'] as const) {
    if (Array.isArray(schema[key])) {
      for (const item of schema[key]) {
        collectRefsFromSchema(item, refs);
      }
    }
  }
}

/**
 * 從一組 operation definitions 收集所有直接引用的 schema 名稱
 */
function collectDirectRefs(operationDefs: OperationDefinition[]): Set<string> {
  const refs = new Set<string>();

  for (const opDef of operationDefs) {
    const op = opDef.operation;

    // 收集 parameters 中的 refs
    if (op.parameters) {
      for (const param of op.parameters) {
        const p = param as OpenAPIV3.ParameterObject;
        if (p.schema) {
          collectRefsFromSchema(p.schema, refs);
        }
      }
    }

    // 收集 requestBody 中的 refs
    if (op.requestBody) {
      const rb = op.requestBody as OpenAPIV3.RequestBodyObject;
      if (rb.content) {
        for (const ct of Object.values(rb.content)) {
          if (ct.schema) {
            collectRefsFromSchema(ct.schema, refs);
          }
        }
      }
    }

    // 收集 responses 中的 refs
    if (op.responses) {
      for (const resp of Object.values(op.responses)) {
        const r = resp as OpenAPIV3.ResponseObject;
        if (r.content) {
          for (const ct of Object.values(r.content)) {
            if (ct.schema) {
              collectRefsFromSchema(ct.schema, refs);
            }
          }
        }
      }
    }
  }

  return refs;
}

/**
 * 解析 schema 的遞迴依賴（transitive dependencies）
 * 例如 TaskResponseDto 引用了 TaskDto，TaskDto 又引用了 TaskStatusRefDto
 */
function resolveTransitiveDeps(
  directRefs: Set<string>,
  allSchemas: Record<string, any>
): Set<string> {
  const resolved = new Set<string>();
  const queue = [...directRefs];

  while (queue.length > 0) {
    const name = queue.pop()!;
    if (resolved.has(name)) continue;
    resolved.add(name);

    const schema = allSchemas[name];
    if (!schema) continue;

    const nestedRefs = new Set<string>();
    collectRefsFromSchema(schema, nestedRefs);

    for (const ref of nestedRefs) {
      if (!resolved.has(ref)) {
        queue.push(ref);
      }
    }
  }

  return resolved;
}

/**
 * 分析所有 group 的 schema 引用，分類為 shared / group-local / unused
 */
export function analyzeSchemaRefs(
  groupOperations: Map<string, OperationDefinition[]>,
  allSchemas: Record<string, any>,
  allSchemaNames: string[]
): SchemaRefAnalysis {
  // 步驟 1：收集每個 group 的完整引用（含遞迴依賴）
  const groupRefs = new Map<string, Set<string>>();

  for (const [groupKey, opDefs] of groupOperations) {
    const directRefs = collectDirectRefs(opDefs);
    const fullRefs = resolveTransitiveDeps(directRefs, allSchemas);
    groupRefs.set(groupKey, fullRefs);
  }

  // 步驟 2：統計每個 schema 被多少個 group 引用
  const refCountMap = new Map<string, Set<string>>();

  for (const [groupKey, refs] of groupRefs) {
    for (const schemaName of refs) {
      if (!refCountMap.has(schemaName)) {
        refCountMap.set(schemaName, new Set());
      }
      refCountMap.get(schemaName)!.add(groupKey);
    }
  }

  // 步驟 3：分類
  const sharedSchemas = new Set<string>();
  const groupLocalSchemas = new Map<string, Set<string>>();
  const unusedSchemas = new Set<string>();

  for (const schemaName of allSchemaNames) {
    const groups = refCountMap.get(schemaName);

    if (!groups || groups.size === 0) {
      unusedSchemas.add(schemaName);
    } else if (groups.size === 1) {
      const groupKey = [...groups][0];
      if (!groupLocalSchemas.has(groupKey)) {
        groupLocalSchemas.set(groupKey, new Set());
      }
      groupLocalSchemas.get(groupKey)!.add(schemaName);
    } else {
      sharedSchemas.add(schemaName);
    }
  }

  // 步驟 4：確保 group-local schema 的依賴一致性
  // 如果 group-A-local 的 schema 依賴了 group-B-local 的 schema，兩者都提升為 shared
  let changed = true;
  while (changed) {
    changed = false;
    for (const [groupKey, localSchemas] of groupLocalSchemas) {
      for (const schemaName of [...localSchemas]) {
        const schema = allSchemas[schemaName];
        if (!schema) continue;

        const deps = new Set<string>();
        collectRefsFromSchema(schema, deps);

        for (const dep of deps) {
          // 檢查 dep 是否是其他 group 的 local schema
          for (const [otherGroup, otherLocals] of groupLocalSchemas) {
            if (otherGroup !== groupKey && otherLocals.has(dep)) {
              // 衝突！兩者都提升為 shared
              sharedSchemas.add(dep);
              sharedSchemas.add(schemaName);
              otherLocals.delete(dep);
              localSchemas.delete(schemaName);
              changed = true;
            }
          }
        }
      }
    }
  }

  return { sharedSchemas, groupLocalSchemas, unusedSchemas };
}
