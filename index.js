// @flow
'use strict';

const ansiStyles = require('ansi-styles');

/*::
type ThemeColor = {
  open: string,
  close: string,
};

type Theme = {
  location: ThemeColor,
  brackets: ThemeColor,
  string: ThemeColor,
  number: ThemeColor,
  boolean: ThemeColor,
  undefined: ThemeColor,
  function: ThemeColor,
  null: ThemeColor,
  node: ThemeColor,
  key: ThemeColor,
};

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

let printArray = (arr, indentation, theme, refs) => {
  if (arr.length === 0) {
    return theme.brackets.open + '[]' + theme.brackets.close;
  }

  let res = '';

  for (let i = 0; i < arr.length; i++) {
    let val = printValue(arr[i], indentation + '  ', theme, refs);
    let space = val[0] === '\n' ? '' : ' ';

    res += '\n' + indentation + '-' + space + val;
  }

  return res;
};

let printKeyValue = (key, value, indentation, theme, refs) => {
  let val = printValue(value, indentation, theme, refs);
  let space = val[0] === '\n' ? '' : ' ';
  return (
    '\n' +
    indentation +
    theme.key.open +
    key +
    theme.key.close +
    ':' +
    space +
    val
  );
};

let printObject = (obj /*: Object */, indentation, theme, refs) => {
  if (isNodeLike(obj)) return printNode(obj, indentation, theme, refs);

  let keys = Object.keys(obj);
  if (keys.length === 0) {
    return theme.brackets.open + '{}' + theme.brackets.close;
  }

  keys = keys.sort();

  let res = '';

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    res += printKeyValue(key, obj[key], indentation + '  ', theme, refs);
  }

  return res;
};

let isNodeLike = (obj /*: Object */) => {
  return typeof obj.type === 'string';
};

let printLocationNumber = val => {
  return typeof val === 'number' ? String(val) : '';
};

let printLocation = location => {
  if (location !== null && typeof location === 'object') {
    let line = printLocationNumber(location.line);
    let column = printLocationNumber(location.column);
    let splitter = line && column ? ':' : '';
    return line + splitter + column;
  } else {
    return '';
  }
};

let printLoc = (loc, theme) => {
  if (loc !== null && typeof loc === 'object') {
    let start = printLocation(loc.start);
    let end = printLocation(loc.end);
    let splitter = end && start ? ',' : '';
    return (
      theme.location.open +
      '(' +
      start +
      splitter +
      end +
      ')' +
      theme.location.close
    );
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

let printNode = (node /*: Node */, indentation, theme, refs) => {
  let loc = printLoc(node.loc, theme);
  let res =
    theme.node.open + node.type + theme.node.close + (loc ? ' ' + loc : '');
  let keys = Object.keys(node).sort();

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (DROP_KEYS[key]) continue;
    res += printKeyValue(key, node[key], indentation + '  ', theme, refs);
  }

  return res;
};

let printValue = (val, indentation, theme /*: Theme */, refs /*: WeakSet<any> */) => {
  if (val === null) {
    return theme.null.open + 'null' + theme.null.close;
  }

  if (typeof val === 'boolean') {
    return theme.boolean.open + String(val) + theme.boolean.close;
  }

  if (typeof val === 'string') {
    return theme.string.open + `'${val}'` + theme.string.close;
  }

  if (typeof val === 'number') {
    return theme.number.open + String(val) + theme.number.close;
  }

  if (typeof val === 'undefined') {
    return theme.undefined.open + 'undefined' + theme.undefined.close;
  }

  if (typeof val === 'function') {
    return theme.function.open + 'Function' + theme.function.close;
  }

  if (refs.has(val)) {
    return '[Circular]'
  } else {
    refs.add(val);
  }

  if (Array.isArray(val)) {
    return printArray(val, indentation + '  ', theme, refs);
  }

  if (typeof val === 'object') {
    return printObject(val, indentation, theme, refs);
  }

  console.error(val);
  throw new Error('Unknown value type found in AST');
};

let getThemeItem = (colors, ansiStyle) => {
  return colors ? ansiStyles[ansiStyle] : {open: '', close: ''};
};

let printAST = (val /*: mixed */, theme /*: boolean */ = false) => {
  const refs = new WeakSet();

  return printValue(val, '', {
    location: getThemeItem(theme, 'dim'),
    brackets: getThemeItem(theme, 'white'),
    boolean: getThemeItem(theme, 'cyan'),
    string: getThemeItem(theme, 'green'),
    number: getThemeItem(theme, 'yellow'),
    null: getThemeItem(theme, 'cyan'),
    undefined: getThemeItem(theme, 'cyan'),
    function: getThemeItem(theme, 'cyan'),
    node: getThemeItem(theme, 'bold'),
    key: getThemeItem(theme, 'white'),
  }, refs);
};

module.exports = printAST;
