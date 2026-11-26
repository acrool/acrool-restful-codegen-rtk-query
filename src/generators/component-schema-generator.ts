import ts from 'typescript';

/**
 * 轉換類型名稱為大駝峰命名
 */
function toPascalCase(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * 重新命名 TypeScript 節點中的標識符
 */
function renameIdentifier(node: ts.Node, oldName: string, newName: string): ts.Node {
  return ts.transform(node, [
    context => rootNode => ts.visitNode(rootNode, function visit(node): ts.Node {
      if (ts.isIdentifier(node) && node.text === oldName) {
        return ts.factory.createIdentifier(newName);
      }
      return ts.visitEachChild(node, visit, context);
    })
  ]).transformed[0];
}

/**
 * 判斷 TypeAliasDeclaration 是否為 string literal union（即 OpenAPI enum）
 * 例如: type ETaskCategory = "feat" | "fix" | "refactor"
 */
function isStringEnumType(node: ts.TypeAliasDeclaration): string[] | null {
  if (!ts.isUnionTypeNode(node.type)) return null;

  const members: string[] = [];
  for (const member of node.type.types) {
    if (ts.isLiteralTypeNode(member) && ts.isStringLiteral(member.literal)) {
      members.push(member.literal.text);
    } else {
      return null; // 含有非 string literal 的成員，不是 enum
    }
  }
  return members.length > 0 ? members : null;
}

/**
 * 將 string union type 轉換為 enum 宣告字串
 * 例如: export enum ETaskCategory { Feat = "feat", Fix = "fix", Refactor = "refactor" }
 */
function generateEnumDeclaration(name: string, members: string[]): string {
  const enumMembers = members.map(value => {
    // enum key: 首字母大寫的 camelCase
    const key = value.charAt(0).toUpperCase() + value.slice(1);
    return `  ${key} = "${value}"`;
  });
  return `export enum ${name} {\n${enumMembers.join(',\n')}\n}`
}

/**
 * 產生 component-schema.ts 內容
 * @param interfaces
 * @param includeOnly - 若提供，則只輸出此 Set 中的類型名稱
 */
export function generateComponentSchemaFile(
  interfaces: Record<string, ts.InterfaceDeclaration | ts.TypeAliasDeclaration>,
  includeOnly?: Set<string>
) {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  const resultFile = ts.createSourceFile(
    'component-schema.ts',
    '',
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  );

  // 處理類型名稱轉換為大駝峰，並建立映射表
  const renamedInterfaces: Array<string> = [];
  const typeNameMapping: Record<string, string> = {};

  Object.entries(interfaces).forEach(([originalName, node]) => {
    const pascalCaseName = toPascalCase(originalName);
    typeNameMapping[originalName] = pascalCaseName;

    // 如果有過濾條件，跳過不在名單中的類型
    if (includeOnly && !includeOnly.has(originalName)) {
      return;
    }

    // 偵測 string union type 並轉換為 enum
    if (ts.isTypeAliasDeclaration(node)) {
      const enumMembers = isStringEnumType(node);
      if (enumMembers) {
        renamedInterfaces.push(generateEnumDeclaration(pascalCaseName, enumMembers));
        return;
      }
    }

    // 重新命名節點
    const renamedNode = renameIdentifier(node, originalName, pascalCaseName);
    const printed = printer.printNode(ts.EmitHint.Unspecified, renamedNode, resultFile);
    renamedInterfaces.push(printed);
  });

  return `/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

${renamedInterfaces.join('\n')}
`;
}