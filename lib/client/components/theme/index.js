'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Themer extends _react.Component {
    constructor() {
        super();
    }

    switchtheme() {
        const currentTheme = localStorage.getItem('Theme');
        if (currentTheme !== 'night') {
            document.documentElement.style.setProperty('--color-text', 'black');
            document.documentElement.style.setProperty('--color-bkg', 'white');
            localStorage.setItem('Theme', 'night');
        } else {
            document.documentElement.style.setProperty('--color-text', 'white');
            document.documentElement.style.setProperty('--color-bkg', 'black');
            localStorage.setItem('Theme', 'day');
        }
    }

    render() {
        return _react2.default.createElement(
            'button',
            { onClick: this.switchtheme },
            'switch Theme'
        );
    }
}

exports.default = Themer;