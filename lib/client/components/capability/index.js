'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.capabilities = undefined;

var _uaParserJs = require('ua-parser-js');

var _uaParserJs2 = _interopRequireDefault(_uaParserJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const agent = new _uaParserJs2.default().getResult();

const capabilities = exports.capabilities = {
    browser: {
        name: agent.browser.name,
        version: agent.browser.version
    },
    OS: {
        name: agent.os.name,
        version: agent.os.version
    },
    downlink: __CLIENT__ ? navigator.connection.downlink : '',
    saveData: __CLIENT__ ? navigator.connection.saveData : '',
    effectiveType: __CLIENT__ ? navigator.connection.effectiveType : '',
    deviceMemory: __CLIENT__ ? navigator.deviceMemory : '',
    hardwareConcurrency: __CLIENT__ ? navigator.hardwareConcurrency : ''
};