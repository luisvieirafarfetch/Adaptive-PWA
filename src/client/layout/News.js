import React, { Component } from 'react';
import DataLoader from '../components/Data-loader';
import List from '../components/List';
import Loading from '../components/Loading';

class News extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <DataLoader
                {...this.props}
                render={transition => {
                    return transition.isLoading ? (
                        <Loading />
                    ) : (
                        <List data={transition.data.initialState} />
                    );
                }}
            />
        );
    }
}

export default News;
