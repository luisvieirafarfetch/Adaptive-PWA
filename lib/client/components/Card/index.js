'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Styles = {
    'card': 'e9e6a3',
    'image': '_333432'
};


const Card = ({ id, index, title, score, by, images }) => _react2.default.createElement(
    'article',
    { className: Styles.card },
    _react2.default.createElement('img', { className: Styles.image, src: images.full }),
    _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'h2',
            null,
            title
        )
    ),
    _react2.default.createElement(
        _reactRouterDom.Link,
        { to: `/comments/${id}` },
        'Comments'
    ),
    _react2.default.createElement(
        'p',
        null,
        ' ',
        `${score} score by ${by}`
    )
);

exports.default = Card;