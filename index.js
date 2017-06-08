// @flow
'use strict';

const prettyFormat = require('pretty-format');
const prettyFormatAST = require('pretty-format-ast');

function printAST(val /*: mixed */, highlight /*: boolean */ = false) {
  return prettyFormat(val, {
    highlight,
    plugins: [prettyFormatAST],
  });
}

module.exports = printAST;
