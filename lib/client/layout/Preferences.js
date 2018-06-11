'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DataSaver = require('../components/Data-saver');

var _DataSaver2 = _interopRequireDefault(_DataSaver);

var _theme = require('../components/theme/');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Preferences extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_DataSaver2.default, null),
            _react2.default.createElement(_theme2.default, null)
        );
    }
}

exports.default = Preferences;