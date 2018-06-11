import React, { Component } from 'react';
import Styles from './capability.css';
import capabilities from '../capability/';
import { get } from 'idb-keyval';

class CapabilityDisplay extends Component {
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
                storage: '',
            },
            dynamic: {
                downlink: '',
                effectiveType: '',
                saveData: '',
            },
        };

        this.container = React.createRef();

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update();
        navigator.connection.onchange = this.update;
    }

    async update() {
        const storage = await navigator.storage.estimate();
        const storagePercent = parseInt(
            (storage.usage / storage.quota)
                .toString()
                .trim()
                .split('e')[0]
        );

        const saveData = await get('Save-Data').then(
            val => (val ? 'true' : 'false')
        );

        this.setState({
            static: {
                OS: window.__PRELOADED_STATE__.negotiables.OS,
                OSVersion: window.__PRELOADED_STATE__.negotiables.OSVersion,
                browser: window.__PRELOADED_STATE__.negotiables.browser,
                browserVersion:
                    window.__PRELOADED_STATE__.negotiables.browserVersion,
                deviceMemory: navigator.deviceMemory,
                hardwareConcurrency: navigator.hardwareConcurrency,
                storage: `${storagePercent}%`,
            },
            dynamic: {
                downlink: navigator.connection.downlink,
                effectiveType: navigator.connection.effectiveType,
                saveData,
            },
        });
    }

    componentDidUpdate() {
        this.container.current.classList.toggle('animate');
        setTimeout(
            () => this.container.current.classList.toggle('animate'),
            200
        );
    }

    render() {
        return (
            <div ref={this.container} className={Styles.display}>
                <h3 className={Styles.title}>Static Properties</h3>
                <dl>
                    <dt>Device OS</dt>
                    <dd>{`${this.state.static.OS} ${
                        this.state.static.OSVersion
                    }`}</dd>

                    <dt>Browser</dt>
                    <dd>{`${this.state.static.browser} ${
                        this.state.static.browserVersion
                    }`}</dd>

                    <dt>Device Memory</dt>
                    <dd>{this.state.static.deviceMemory}</dd>

                    <dt>Available CPU's</dt>
                    <dd>{this.state.static.hardwareConcurrency}</dd>

                    <dt>Storage:</dt>
                    <dd>{this.state.static.storage}</dd>
                </dl>
                <h3 className={Styles.title}>Dynamic Properties</h3>
                <dl>
                    <dt>Download Speed</dt>
                    <dd>{this.state.dynamic.downlink}</dd>

                    <dt>Connection type</dt>
                    <dd>{this.state.dynamic.effectiveType}</dd>

                    <dt>Save-data:</dt>
                    <dd
                        style={{
                            color:
                                this.state.dynamic.saveData === 'true'
                                    ? 'green'
                                    : 'black',
                        }}
                    >
                        {this.state.dynamic.saveData}
                    </dd>
                </dl>
                <div>
                    <button onClick={this.update}>Update</button>
                </div>
            </div>
        );
    }
}

export default CapabilityDisplay;
