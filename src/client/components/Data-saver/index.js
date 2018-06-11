import React, { Component } from 'react';
import { set, get } from 'idb-keyval';

class DataSaver extends React.Component {
    constructor(props) {
        super(props);

        this.state = { dataSaver: '' };

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value =
            target.type === 'checkbox' ? target.checked : target.value;

        this.setState(
            {
                dataSaver: value,
            },
            function() {
                set('Save-Data', value);
            }
        );
    }
    componentDidMount() {
        get('Save-Data').then(val =>
            this.setState({
                dataSaver: val,
            })
        );
    }
    render() {
        return (
            <div>
                <h2>Data-saver mode:</h2>
                <div>
                    <input
                        value={this.state.dataSaver}
                        name="data-saver"
                        type="checkbox"
                        checked={this.state.dataSaver}
                        onChange={this.handleInputChange}
                    />
                </div>
            </div>
        );
    }
}

export default DataSaver;
