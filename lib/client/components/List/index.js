'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Card = require('../Card');

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Styles = {
    'container': 'bb6608',
    'list': '_74c4d7'
};


const List = ({ data }) => {
    return _react2.default.createElement(
        'div',
        { className: Styles.container },
        _react2.default.createElement(
            'div',
            { className: Styles.list },
            data.map((story, index) => _react2.default.createElement(_Card2.default, {
                key: story.data.id,
                id: story.data.id,
                title: story.data.title,
                score: story.data.score,
                by: story.data.by,
                images: story.images
            }))
        )
    );
};

exports.default = List;