require('dotenv').config();
const Database = require('./shared/spread-hub-context');
const http = require('http');
const Koa = require('koa');
const morgan = require('koa-morgan');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const auth = require('./middlewares/auth.meddleware');
// const koajwt = require('koa-jwt');
const routesLoader = require('./routes-loader');


(async () => {
    const app = new Koa();
    app.use(bodyParser());
    await Database.connect();
    routesLoader(app, 'private');
    routesLoader(app, 'public');

    http.createServer(app.callback());
    app.use(cors());
    app.use(morgan('dev'));
    
    app.listen(process.env.PORT || 4000);
    console.log('Server listening on port 4000');
})()
