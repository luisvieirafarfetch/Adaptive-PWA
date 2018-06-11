'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StylesCommon = {
    'nav': 'bbc8e7'
};
var Styles = {
    'nav': '_30b5f8',
    'title': '_13632a',
    'navIOS': 'c8b8be'
};


const Nav = ({ children }) => _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
        'header',
        { className: [StylesCommon.nav, Styles.nav].join(' ') },
        _react2.default.createElement(
            'h1',
            { className: Styles.title },
            'HN'
        )
    ),
    children,
    _react2.default.createElement(
        'ul',
        { className: [StylesCommon.nav, Styles.navIOS].join(' ') },
        _react2.default.createElement(
            'li',
            { className: StylesCommon.link },
            _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/' },
                'Top'
            )
        ),
        _react2.default.createElement(
            'li',
            { className: StylesCommon.link },
            _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/new' },
                'New'
            )
        ),
        _react2.default.createElement(
            'li',
            { className: StylesCommon.link },
            _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/preferences' },
                'Preferences'
            )
        )
    )
);

exports.default = Nav;