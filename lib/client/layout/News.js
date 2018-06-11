'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DataLoader = require('../components/Data-loader');

var _DataLoader2 = _interopRequireDefault(_DataLoader);

var _List = require('../components/List');

var _List2 = _interopRequireDefault(_List);

var _Loading = require('../components/Loading');

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class News extends _react2.default.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return _react2.default.createElement(_DataLoader2.default, _extends({}, this.props, {
            render: transition => {
                return transition.isLoading ? _react2.default.createElement(_Loading2.default, null) : _react2.default.createElement(_List2.default, { data: transition.data.initialState });
            }
        }));
    }
}

exports.default = News;