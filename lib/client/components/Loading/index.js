'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Styles = {
  'loading': 'abfdba',
  'spin': '_60c4b3'
};


const Loading = () => _react2.default.createElement('div', { className: Styles.loading });

exports.default = Loading;