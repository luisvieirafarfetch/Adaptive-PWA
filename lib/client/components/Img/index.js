'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Img extends _react.Component {
    constructor(props) {
        super(props);

        this.isConstrained = capabilities.effectiveType === '2g';

        this.state = {
            showLoadOriginal: this.isConstrained,
            url: this.props.src
        };
    }

    loadOriginal() {
        this.setState({ url: `${this.props.url}?fetchOriginal` });
    }

    render() {
        return _react2.default.createElement(
            'div',
            null,
            this.state.showLoadOriginal && _react2.default.createElement(
                'button',
                { onClick: this.loadOriginal },
                'load original'
            ),
            _react2.default.createElement('img', { src: this.state.url })
        );
    }
}