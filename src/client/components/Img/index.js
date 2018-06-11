import React, { Component } from 'react';

class Img extends Component {
    constructor(props) {
        super(props);

        this.isConstrained = capabilities.effectiveType === '2g';

        this.state = {
            showLoadOriginal: this.isConstrained,
            url: this.props.src,
        };
    }

    loadOriginal() {
        this.setState({ url: `${this.props.url}?fetchOriginal` });
    }

    render() {
        return (
            <div>
                {this.state.showLoadOriginal && (
                    <button onClick={this.loadOriginal}>load original</button>
                )}
                <img src={this.state.url} />
            </div>
        );
    }
}
