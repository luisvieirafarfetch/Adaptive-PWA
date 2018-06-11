'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _idbKeyval = require('idb-keyval');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DataSaver extends _react2.default.Component {
    constructor(props) {
        super(props);

        this.state = { dataSaver: '' };

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            dataSaver: value
        }, function () {
            (0, _idbKeyval.set)('Save-Data', value);
        });
    }
    componentDidMount() {
        (0, _idbKeyval.get)('Save-Data').then(val => this.setState({
            dataSaver: val
        }));
    }
    render() {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'h2',
                null,
                'Data-saver mode:'
            ),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('input', {
                    value: this.state.dataSaver,
                    name: 'data-saver',
                    type: 'checkbox',
                    checked: this.state.dataSaver,
                    onChange: this.handleInputChange
                })
            )
        );
    }
}

exports.default = DataSaver;