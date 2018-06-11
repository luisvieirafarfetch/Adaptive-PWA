import React, { Component } from 'react';

class Themer extends Component {
    constructor() {
        super();
    }

    switchtheme() {
        const currentTheme = localStorage.getItem('Theme');
        if (currentTheme !== 'night') {
            document.documentElement.style.setProperty('--color-text', 'black');
            document.documentElement.style.setProperty('--color-bkg', 'white');
            localStorage.setItem('Theme', 'night');
        } else {
            document.documentElement.style.setProperty('--color-text', 'white');
            document.documentElement.style.setProperty('--color-bkg', 'black');
            localStorage.setItem('Theme', 'day');
        }
    }

    render() {
        return <button onClick={this.switchtheme}>switch Theme</button>;
    }
}

export default Themer;
