'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _capability = require('../capability/');

var _capability2 = _interopRequireDefault(_capability);

var _idbKeyval = require('idb-keyval');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Styles = {
    'display': 'ba8fd8',
    'title': '_730d6a'
};


class CapabilityDisplay extends _react.Component {
    constructor(props) {
        super(props);

        this.state = {
            static: {
                OS: '',
                OSVersion: '',
                browser: '',
                browserVersion: '',
                deviceMemory: '',
                hardwareConcurrency: '',
                storage: ''
            },
            dynamic: {
                downlink: '',
                effectiveType: '',
                saveData: ''
            }
        };

        this.container = _react2.default.createRef();

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update();
        navigator.connection.onchange = this.update;
    }

    async update() {
        const storage = await navigator.storage.estimate();
        const storagePercent = parseInt((storage.usage / storage.quota).toString().trim().split('e')[0]);

        const saveData = await (0, _idbKeyval.get)('Save-Data').then(val => val ? 'true' : 'false');

        this.setState({
            static: {
                OS: window.__PRELOADED_STATE__.negotiables.OS,
                OSVersion: window.__PRELOADED_STATE__.negotiables.OSVersion,
                browser: window.__PRELOADED_STATE__.negotiables.browser,
                browserVersion: window.__PRELOADED_STATE__.negotiables.browserVersion,
                deviceMemory: navigator.deviceMemory,
                hardwareConcurrency: navigator.hardwareConcurrency,
                storage: `${storagePercent}%`
            },
            dynamic: {
                downlink: navigator.connection.downlink,
                effectiveType: navigator.connection.effectiveType,
                saveData
            }
        });
    }

    componentDidUpdate() {
        this.container.current.classList.toggle('animate');
        setTimeout(() => this.container.current.classList.toggle('animate'), 200);
    }

    render() {
        return _react2.default.createElement(
            'div',
            { ref: this.container, className: Styles.display },
            _react2.default.createElement(
                'h3',
                { className: Styles.title },
                'Static Properties'
            ),
            _react2.default.createElement(
                'dl',
                null,
                _react2.default.createElement(
                    'dt',
                    null,
                    'Device OS'
                ),
                _react2.default.createElement(
                    'dd',
                    null,
                    `${this.state.static.OS} ${this.state.static.OSVersion}`
                ),
                _react2.default.createElement(
                    'dt',
                    null,
                    'Browser'
                ),
                _react2.default.createElement(
                    'dd',
                    null,
                    `${this.state.static.browser} ${this.state.static.browserVersion}`
                ),
                _react2.default.createElement(
                    'dt',
                    null,
                    'Device Memory'
                ),
                _react2.default.createElement(
                    'dd',
                    null,
                    this.state.static.deviceMemory
                ),
                _react2.default.createElement(
                    'dt',
                    null,
                    'Available CPU\'s'
                ),
                _react2.default.createElement(
                    'dd',
                    null,
                    this.state.static.hardwareConcurrency
                ),
                _react2.default.createElement(
                    'dt',
                    null,
                    'Storage:'
                ),
                _react2.default.createElement(
                    'dd',
                    null,
                    this.state.static.storage
                )
            ),
            _react2.default.createElement(
                'h3',
                { className: Styles.title },
                'Dynamic Properties'
            ),
            _react2.default.createElement(
                'dl',
                null,
                _react2.default.createElement(
                    'dt',
                    null,
                    'Download Speed'
                ),
                _react2.default.createElement(
                    'dd',
                    null,
                    this.state.dynamic.downlink
                ),
                _react2.default.createElement(
                    'dt',
                    null,
                    'Connection type'
                ),
                _react2.default.createElement(
                    'dd',
                    null,
                    this.state.dynamic.effectiveType
                ),
                _react2.default.createElement(
                    'dt',
                    null,
                    'Save-data:'
                ),
                _react2.default.createElement(
                    'dd',
                    {
                        style: {
                            color: this.state.dynamic.saveData === 'true' ? 'green' : 'black'
                        }
                    },
                    this.state.dynamic.saveData
                )
            ),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'button',
                    { onClick: this.update },
                    'Update'
                )
            )
        );
    }
}

exports.default = CapabilityDisplay;