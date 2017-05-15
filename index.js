// @flow
'use strict';

/*::
type Location = {
  line: number,
  column: number,
};

type Loc = {
  start: Location,
  end: Location,
};

type Node = {
  type: string,
  loc: Loc,
  [key: string]: mixed,
};
*/

let printArray = (arr, indentation) => {
  if (arr.length === 0) {
    return '[]';
  }

  let res = '';

  for (let i = 0; i < arr.length; i++) {
    res += '\n' + indentation + '- ' + printValue(arr[i], indentation + '  ');
  }

  return res;
};

let printKeyValue = (key, val, indentation) => {
  return '\n' + indentation + key + ': ' + printValue(val, indentation);
};

let printObject = (obj /*: Object */, indentation) => {
  if (isNodeLike(obj)) return printNode(obj, indentation);

  let keys = Object.keys(obj);
  if (keys.length === 0) {
    return '{}';
  }

  keys = keys.sort();

  let res = '';

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    res += printKeyValue(key, obj[key], indentation + '  ');
  }

  return res;
};

let isNodeLike = (obj /*: Object */) => {
  return typeof obj.type === 'string';
};

let printLocationNumber = val => {
  return typeof val === 'number' ? val : '?';
};

let printLocation = location => {
  if (location !== null && typeof location === 'object') {
    return (
      printLocationNumber(location.line) +
      ':' +
      printLocationNumber(location.column)
    );
  } else {
    return '';
  }
};

let printLoc = loc => {
  if (loc !== null && typeof loc === 'object') {
    return '(' + printLocation(loc.start) + ', ' + printLocation(loc.end) + ')';
  } else {
    return '';
  }
};

let DROP_KEYS = {
  type: true,
  start: true,
  end: true,
  loc: true,
};

let printNode = (node /*: Node */, indentation) => {
  let res = node.type + ' ' + printLoc(node.loc);
  let keys = Object.keys(node).sort();

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (DROP_KEYS[key]) continue;
    res += printKeyValue(key, node[key], indentation + '  ');
  }

  return res;
};

let printValue = (val, indentation) => {
  if (val === null) return 'null';

  if (typeof val === 'boolean') return String(val);
  if (typeof val === 'string') return `"${val}"`;
  if (typeof val === 'number') return String(val);
  if (typeof val === 'undefined') return 'undefined';

  if (Array.isArray(val)) return printArray(val, indentation + '  ');
  if (typeof val === 'object') return printObject(val, indentation);

  console.error(val);
  throw new Error('Unknown value type found in AST');
};

let printAST = (val /*: mixed */) => {
  return printValue(val, '');
};

module.exports = printAST;
