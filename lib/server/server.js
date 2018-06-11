'use strict';

process.on('unhandledRejection', err => {
    throw err;
});

const earlyChunk = require('../public/htmlChunks').earlyChunk;
const lateChunk = require('../public/htmlChunks').lateChunk;

const capabilityFilter = require('./NegotiationRules').capability;
const platformFilter = require('./NegotiationRules').platform;

const express = require('express');
const firebase = require('firebase');
const hackernews = require('firebase-hackernews');
const useragent = require('useragent');
const cookieParser = require('cookie-parser');
const matchPath = require('react-router').matchPath;
const routes = require('../routes').routes;
const axios = require('axios');

const hnservice = hackernews.init(firebase);
const app = express();

const unsplashKey = '4dfb97f5e76ece4280b1b5c474aec5099a5a6564411d94af4fc7f8e4183fe102';

const mock = require('./mock');
const args = process.argv;

const useMocks = args.find(x => x === '--mock');

app.use('/', express.static(`${process.cwd()}/src/public`));
app.use('/', express.static(`${process.cwd()}/build/`));
app.use('/', express.static(`${process.cwd()}/src/server/images/`));
app.use(cookieParser());

app.get('/favicon.ico', (req, res) => {
    res.status(204);
});

app.get('/stories/:id', async (req, res) => {
    const connectionLevel = req.get('Connection-Type');
    const saveData = req.get('Save-Data');

    let items;
    if (connectionLevel <= 2 || saveData === 'true') {
        items = 4;
    } else {
        items = 20;
    }

    let data;

    if (useMocks) {
        const mockdata = req.params.id === 'new' ? mock.newItems : mock.topItems;
        data = mockdata.slice(0, items);
    } else {
        const stories = id => hnservice.stories(id, {
            count: items
        });

        const images = useMocks ? null : axios.get(`https://api.unsplash.com/photos/random?count=${items}&client_id=${unsplashKey}`).then(response => response.data);

        data = await Promise.all([stories(req.params.id), images]).then(response => {
            const news = response[0];
            const images = response[1].map(image => image.urls);

            const data = news.map((value, index) => {
                return { data: value, images: images[index] };
            });

            return data;
        });
    }

    res.status(200).send(data);
});

app.get('/comments/:id', async (req, res) => {
    const connectionLevel = req.get('Connection-Type');
    const saveData = req.get('Save-Data');

    let items;

    if (connectionLevel <= 2 || saveData === 'true') {
        items = 4;
    } else {
        items = 20;
    }
    let data;
    if (useMocks) {
        const mockdata = mock.comments;
        data = mockdata.slice(0, items);
    } else {
        data = await hnservice.kids(req.params.id).then(response => {
            const filtereditems = Object.values(response).slice(0, items);

            return filtereditems;
        }).catch(err => console.log(err));
    }

    res.status(200).send(data);
});

app.get('/:stories?', async (req, res) => {
    /*
    1st flush
    Send preload header to client with right bundle
    */

    const agent = useragent.parse(req.headers['user-agent']);

    const negotiables = {
        browser: agent.family,
        browserVersion: agent.major,
        OS: agent.os.family,
        OSVersion: agent.os.major,
        deviceMemory: req.headers['Device-Memory'],
        saveData: req.headers['Save-Data']
    };

    const capability = capabilityFilter(negotiables);
    const platform = platformFilter(negotiables);

    // Create file path based on negotiation results
    const variant = `${platform}.${capability}`;

    // Set the content type as html to enable streaming
    res.set('Content-Type', 'text/html');

    // Render and flush early chunk prefetching variant assets
    const firstFlush = earlyChunk(variant);
    res.write(firstFlush);
    res.flushHeaders();

    /*
    2nd flush
    Fetch Route data and server render
    */
    const activeRoute = routes.find(route => matchPath(req.url, route));

    const parameter = req.url.split('/').pop();
    const page = parameter === '' ? 'top' : parameter;

    const data = await activeRoute.dataLoader(page);

    const preloadedState = Object.assign({ initialState: data }, { negotiables: negotiables });

    const serverRenderer = require(`../../build/${variant}.server.js`);
    let html = serverRenderer.render(preloadedState, req.url);

    // Close html flush and response
    const lateFlush = lateChunk(html, variant, JSON.stringify(preloadedState));
    res.write(lateFlush);
    res.flushHeaders();
    res.end();
});

// Start server
app.listen(3000, 'localhost', err => {
    if (err) {
        throw err;
    }
    console.log('localhost:3000');
});