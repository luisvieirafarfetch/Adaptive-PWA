'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Styles = {
    'comment': '_66f7b7'
};


const Comment = ({ data }) => {
    return _react2.default.createElement(
        'div',
        null,
        Object.values(data).map((comment, index) => {
            return _react2.default.createElement(
                'article',
                { className: Styles.comment, key: index },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('p', {
                        dangerouslySetInnerHTML: {
                            __html: comment.text
                        }
                    })
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    `by ${comment.by}`
                )
            );
        })
    );
};

exports.default = Comment;