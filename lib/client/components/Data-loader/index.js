'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _routes = require('../../../routes');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DataLoader extends _react2.default.Component {
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
            data: initialData
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchData(this.props.match.params.id);
        }
    }

    fetchData(id = 'top') {
        this.setState({ isLoading: true });
        const activeRoute = _routes.routes.find(route => (0, _reactRouter.matchPath)(this.props.match.url, route));

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

exports.default = DataLoader;