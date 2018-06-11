'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _idbKeyval = require('idb-keyval');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StylesCommon = {
    'nav': 'bbc8e7'
};
var Styles = {
    'nav': 'bcff0b',
    'title': '_7e1599',
    'footer': 'cb5460'
};


class Nav extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            saveData: false
        };
    }

    async componentDidMount() {
        await (0, _idbKeyval.get)('Save-Data').then(val => this.setState({
            saveData: val
        }));
    }

    render() {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'ul',
                { className: [StylesCommon.nav, Styles.nav].join(' ') },
                _react2.default.createElement(
                    'li',
                    { className: StylesCommon.link },
                    _react2.default.createElement(
                        'h1',
                        { className: Styles.title },
                        'HN'
                    )
                ),
                _react2.default.createElement(
                    'li',
                    { className: Styles.link },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/' },
                        'Top'
                    )
                ),
                _react2.default.createElement(
                    'li',
                    { className: Styles.link },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/new' },
                        'New'
                    )
                ),
                _react2.default.createElement(
                    'li',
                    { className: Styles.link },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/preferences' },
                        'Preferences'
                    )
                )
            ),
            this.props.children,
            _react2.default.createElement('footer', { className: Styles.footer })
        );
    }
}

exports.default = Nav;