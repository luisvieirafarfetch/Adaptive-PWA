'use strict';

/* 
Determine OS for navigation component
*/
const platform = negotiables => {
    const { OS } = negotiables;
    if (OS === 'iOS') {
        return 'ios';
    } else if (OS === 'Android') {
        return 'android';
    } else {
        return 'default';
    }
};

const capability = negotiables => {
    const { browser, browserVersion } = negotiables;

    if (browser === 'Chrome' && browserVersion >= 59 || browser === 'Mobile Safari' && browserVersion >= 10 || browser === 'Firefox' && browserVersion >= 15) {
        return 'modern';
    } else {
        return 'legacy';
    }
};

module.exports = { platform, capability };