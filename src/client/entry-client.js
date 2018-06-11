import React from 'react';
import ReactDOM from 'react-dom';
import App from './layout/app';
import { BrowserRouter as Router } from 'react-router-dom';

const rootEl = document.getElementById('app');

ReactDOM.hydrate(
    <Router>
        <App />
    </Router>,
    rootEl
);
