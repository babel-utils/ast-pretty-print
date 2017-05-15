// @flow
'use strict';

const printAST = require('./');

let ast = {
  type: 'FunctionDeclaration',
  start: 0,
  end: 31,
  // loc: {
  //   start: {
  //     line: 1,
  //     column: 0,
  //   },
  //   end: {
  //     line: 1,
  //     column: 31,
  //   },
  //   lines: {},
  //   indent: 0,
  // },
  id: {
    type: 'Identifier',
    start: 9,
    end: 10,
    loc: {
      start: {
        line: 1,
        column: 9,
      },
      end: {
        line: 1,
        column: 10,
      },
      identifierName: 'a',
      lines: {},
      indent: 0,
    },
    name: 'a',
  },
  generator: false,
  expression: false,
  async: false,
  params: [
    {
      type: 'Identifier',
      start: 11,
      end: 18,
      loc: {
        start: {
          line: 1,
          column: 11,
        },
        end: {
          line: 1,
          column: 18,
        },
        identifierName: 'b',
        lines: {},
        indent: 0,
      },
      name: 'b',
      typeAnnotation: {
        type: 'TypeAnnotation',
        start: 12,
        end: 18,
        loc: {
          start: {
            line: 1,
            column: 12,
          },
          end: {
            line: 1,
            column: 18,
          },
          lines: {},
          indent: 0,
        },
        typeAnnotation: {
          type: 'StringLiteralTypeAnnotation',
          start: 14,
          end: 18,
          loc: {
            start: {
              line: 1,
              column: 14,
            },
            end: {
              line: 1,
              column: 18,
            },
            lines: {},
            indent: 0,
          },
          extra: {
            rawValue: 'hi',
            raw: '"hi"',
          },
          value: 'hi',
        },
      },
    },
    {
      type: 'Identifier',
      start: 20,
      end: 21,
      loc: {
        start: {
          line: 1,
          column: 20,
        },
        end: {
          line: 1,
          column: 21,
        },
        identifierName: 'c',
        lines: {},
        indent: 0,
      },
      name: 'c',
    },
    {
      type: 'RestElement',
      start: 23,
      end: 27,
      loc: {
        start: {
          line: 1,
          column: 23,
        },
        end: {
          line: 1,
          column: 27,
        },
        lines: {},
        indent: 0,
      },
      argument: {
        type: 'Identifier',
        start: 26,
        end: 27,
        loc: {
          start: {
            line: 1,
            column: 26,
          },
          end: {
            line: 1,
            column: 27,
          },
          identifierName: 'd',
          lines: {},
          indent: 0,
        },
        name: 'd',
      },
    },
  ],
  body: {
    type: 'BlockStatement',
    start: 29,
    end: 31,
    loc: {
      start: {
        line: 1,
        column: 29,
      },
      end: {
        line: 1,
        column: 31,
      },
      lines: {},
      indent: 0,
    },
    body: [],
    directives: [],
  },
  __clone: () => true,
};

console.log(printAST(ast, true));
