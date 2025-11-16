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
 * 產生 component-schema.ts 內容
 * @param interfaces
 */
export function generateComponentSchemaFile(interfaces: Record<string, ts.InterfaceDeclaration | ts.TypeAliasDeclaration>) {
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