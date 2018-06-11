import React, { Component } from 'react';
import DataLoader from '../components/Data-loader';
import Comment from '../components/Comment';
import Loading from '../components/Loading';

class Comments extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <DataLoader
                {...this.props}
                render={transition =>
                    transition.isLoading ? (
                        <Loading />
                    ) : (
                        <Comment data={transition.data.initialState} />
                    )
                }
            />
        );
    }
}

export default Comments;
