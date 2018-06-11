'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Nav = require('../components/Nav/Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _routes = require('../../routes');

var _reactRouterDom = require('react-router-dom');

var _capabilityDisplay = require('../components/capabilityDisplay');

var _capabilityDisplay2 = _interopRequireDefault(_capabilityDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const App = () => _react2.default.createElement(
    _Nav2.default,
    null,
    _react2.default.createElement(_capabilityDisplay2.default, null),
    _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        _routes.routes.map((route, i) => _react2.default.createElement(_reactRouterDom.Route, _extends({ key: i }, route)))
    )
);

exports.default = App;