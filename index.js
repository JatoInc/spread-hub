if (!process.env.PRODUCTION) {
    require('dotenv').config();
}

const Database = require('./shared/spread-hub-context');
const http = require('http');
const Koa = require('koa');
const morgan = require('koa-morgan');
const cors = require('@koa/cors');
// const bodyParser = require('koa-bodyparser');
const bodyParser = require('koa-body');
const routesLoader = require('./routes-loader');
const app = new Koa();

(async () => {
    await Database.connect();
    
    app.use(cors());
    app.use(bodyParser({multipart: true}));
    
    routesLoader(app, 'private');
    routesLoader(app, 'public');

    http.createServer(app.callback());
    app.use(morgan('dev'));
    
    app.listen(process.env.PORT || 4000);
    console.log('Server listening on port 4000');
})()
