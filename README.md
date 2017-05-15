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

```
FunctionDeclaration (1:0, 1:31)
  async: false
  body: BlockStatement (1:29, 1:31)
    body: []
    directives: []
  expression: false
  generator: false
  id: Identifier (1:9, 1:10)
    name: 'a'
  params:
    - Identifier (1:11, 1:18)
        name: 'b'
        typeAnnotation: TypeAnnotation (1:12, 1:18)
          typeAnnotation: StringLiteralTypeAnnotation (1:14, 1:18)
            extra:
              raw: 'hi'
              rawValue: 'hi'
            value: 'hi'
    - Identifier (1:20, 1:21)
        name: 'c'
    - RestElement (1:23, 1:27)
        argument: Identifier (1:26, 1:27)
          name: 'd'
```

AST Nodes are expected to have this shape:

```js
type Node = {
  type: string,
  start?: number, // ignored
  end?: number, // ignored
  loc?: {
    start?: {
      line?: number,
      column?: number,
    },
    end?: {
      line?: number,
      column?: number,
    },
  },
  [key: string]: mixed,
};
```
