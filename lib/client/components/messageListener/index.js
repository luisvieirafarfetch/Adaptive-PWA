'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Styles = {
    'messageBox': 'eab414'
};


class MessageListener extends _react.Component {
    constructor(props) {
        super(props);
        this.state = '';
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update();
        let self = this;
        navigator.connection.onchange = this.update(false);
        navigator.serviceWorker.addEventListener('message', function (event) {
            self.update(event.data);
        });
    }

    async update(data) {
        this.setState({
            data
        });
    }

    render() {
        return this.state.data ? _react2.default.createElement(
            'div',
            { className: Styles.messageBox },
            JSON.stringify(this.state.data)
        ) : null;
    }
}

exports.default = MessageListener;