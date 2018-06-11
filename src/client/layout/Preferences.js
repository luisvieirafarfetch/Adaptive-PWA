import React, { Component } from 'react';
import DataSaver from '../components/Data-saver';
import Themer from '../components/theme/';

class Preferences extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <DataSaver />
                <Themer />
            </div>
        );
    }
}

export default Preferences;
