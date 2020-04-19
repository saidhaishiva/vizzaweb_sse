import { enableProdMode } from '@angular/core';
import 'zone.js/dist/zone-node';
import { join } from 'path';
import { readFileSync } from 'fs';
import 'reflect-metadata';
import * as express from 'express';

// Enable production mode
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 3838;
const DIST_FOLDER = join(process.cwd(), 'dist');

// For the template, we use  index.html file.
const template = readFileSync(join(DIST_FOLDER, 'index.html')).toString();

const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

// Express
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

//module.exports = require('./server/main');

// Universal express-engine
app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Server static files from /browser
app.get('*.*', express.static(DIST_FOLDER), {
    maxAge: '1y'
});

// All regular routes use the Universal engine
app.get('*', (req, res) => {
    res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});
