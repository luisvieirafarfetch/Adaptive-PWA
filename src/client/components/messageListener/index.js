import React, { Component } from 'react';
import Styles from './index.css';

class MessageListener extends Component {
    constructor(props) {
        super(props);
        this.state = '';
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update();
        let self = this;
        navigator.connection.onchange = this.update(false);
        navigator.serviceWorker.addEventListener('message', function(event) {
            self.update(event.data);
        });
    }

    async update(data) {
        this.setState({
            data,
        });
    }

    render() {
        return this.state.data ? (
            <div className={Styles.messageBox}>
                {JSON.stringify(this.state.data)}
            </div>
        ) : null;
    }
}

export default MessageListener;
