'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.routes = undefined;

var _News = require('./client/layout/News');

var _News2 = _interopRequireDefault(_News);

var _Preferences = require('./client/layout/Preferences');

var _Preferences2 = _interopRequireDefault(_Preferences);

var _Comments = require('./client/layout/Comments');

var _Comments2 = _interopRequireDefault(_Comments);

var _API = require('./client/components/API');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = exports.routes = [{
    path: '/preferences',
    component: _Preferences2.default,
    dataLoader: () => Promise.resolve()
}, {
    path: '/:id?',
    exact: true,
    component: _News2.default,
    dataLoader: param => (0, _API.getNews)(param)
}, {
    path: '/comments/:id',
    component: _Comments2.default,
    dataLoader: param => (0, _API.getComments)(param)
}];