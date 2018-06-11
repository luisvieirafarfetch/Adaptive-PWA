import React from 'react';
import Nav from '../components/Nav/Nav';
import { routes } from '../../routes';
import { Route, Switch } from 'react-router-dom';
import CapabilityDisplay from '../components/capabilityDisplay';

import './theme.css';

const App = () => (
    <Nav>
        <CapabilityDisplay />
        <Switch>
            {routes.map((route, i) => <Route key={i} {...route} />)}
        </Switch>
    </Nav>
);

export default App;
