import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './layout/app';

export const render = (preloadedState, route) => {
    const context = { preloadedState };

    const markup = renderToString(
        <StaticRouter location={route} context={context}>
            <App />
        </StaticRouter>
    );
    return markup;
};
