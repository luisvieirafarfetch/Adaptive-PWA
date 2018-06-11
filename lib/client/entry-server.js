'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.render = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouterDom = require('react-router-dom');

var _app = require('./layout/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const render = exports.render = (preloadedState, route) => {
    const context = { preloadedState };

    const markup = (0, _server.renderToString)(_react2.default.createElement(
        _reactRouterDom.StaticRouter,
        { location: route, context: context },
        _react2.default.createElement(_app2.default, null)
    ));
    return markup;
};