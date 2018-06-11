import UAParser from 'ua-parser-js';

const agent = new UAParser().getResult();

export const capabilities = {
    browser: {
        name: agent.browser.name,
        version: agent.browser.version,
    },
    OS: {
        name: agent.os.name,
        version: agent.os.version,
    },
    downlink: __CLIENT__ ? navigator.connection.downlink : '',
    saveData: __CLIENT__ ? navigator.connection.saveData : '',
    effectiveType: __CLIENT__ ? navigator.connection.effectiveType : '',
    deviceMemory: __CLIENT__ ? navigator.deviceMemory : '',
    hardwareConcurrency: __CLIENT__ ? navigator.hardwareConcurrency : '',
};
