'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const buildVariants = exports.buildVariants = {
    render: ['client', 'server'],
    category: ['android', 'IOS', 'desktop', 'mobile'],
    capability: ['modern', 'legacy']
};

// Resource Variants
const resourceVariants = exports.resourceVariants = {
    'Viewport-Width': [480, 1024],
    DPR: [0, 2],
    'Save-Data': true
};