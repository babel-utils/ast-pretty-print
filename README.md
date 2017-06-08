# ast-pretty-print

> A pretty printer for AST-like structures

- Super fast (useful for build tools)
- Concise output (useful for debugging)
- Consistent output (useful for snapshot testing)

```js
import parser from 'parser';
import printAST from 'ast-pretty-print';

let code = `...`;
let ast = parser.parse(code);
let printed = printAST(ast);

console.log(printed);
```

```js
Node "FunctionDeclaration"
  __clone: [Function __clone]
  async: false
  body: Node "BlockStatement" (1:29, 1:31)
    body: Array []
    directives: Array []
  expression: false
  generator: false
  id: Node "Identifier" (1:9, 1:10)
    name: "a"
  params: Array [
    Node "Identifier" (1:11, 1:18)
      name: "b"
      typeAnnotation: Node "TypeAnnotation" (1:12, 1:18)
          typeAnnotation: Node "StringLiteralTypeAnnotation" (1:14, 1:18)
              extra: Object {
                  "raw": "\"hi\"",
                  "rawValue": "hi",
                }
             value: "hi",
    Node "Identifier" (1:20, 1:21)
      name: "c",
    Node "RestElement" (1:23, 1:27)
      argument: Node "Identifier" (1:26, 1:27)
        name: "d",
  ]
```
