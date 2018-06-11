'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getComments = exports.getNews = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getNews = exports.getNews = page => _axios2.default.get(`http://localhost:3000/stories/${page}`).then(response => {
    return response.data;
});

const getComments = exports.getComments = id => _axios2.default.get(`http://localhost:3000/comments/${id}`).then(response => response.data);