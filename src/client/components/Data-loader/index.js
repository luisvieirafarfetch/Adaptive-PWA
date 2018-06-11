import React from 'react';
import { routes } from '../../../routes';
import { matchPath } from 'react-router';
class DataLoader extends React.Component {
    constructor(props) {
        super(props);

        let initialData;
        this.firstPass = 1;

        if (__CLIENT__ && this.firstPass === 1) {
            this.firstPass++;
            initialData = window.__PRELOADED_STATE__ || { initialState: [] };
        } else {
            initialData = props.staticContext.preloadedState;
        }

        this.state = {
            isLoading: false,
            data: initialData,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchData(this.props.match.params.id);
        }
    }

    fetchData(id = 'top') {
        this.setState({ isLoading: true });
        const activeRoute = routes.find(route =>
            matchPath(this.props.match.url, route)
        );

        activeRoute.dataLoader(id).then(data => {
            this.setState({ data: { initialState: data }, isLoading: false });
        });
    }

    componentDidMount() {
        if (this.state.data.initialState.length === 0 || this.firstPass > 1) {
            this.fetchData(this.props.match.params.id);
        }
    }

    render() {
        return this.props.render(this.state);
    }
}

export default DataLoader;
