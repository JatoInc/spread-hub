require('dotenv').config();
const Database = require('./shared/spread-hub-context');
const http = require('http');
const Koa = require('koa');
const morgan = require('koa-morgan');
const cors = require('@koa/cors');
// const koajwt = require('koa-jwt');
// const routesLoader = require('./routes-loader');


(async () => {
    const app = new Koa();
    app.use(bodyParser());
    await Database.connect();
    const loginRoute = require('./routes/public/login.route');
    const professorRoute = require('./routes/private/professors.route');

    http.createServer(app.callback());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(loginRoute.routes())
    app.use(professorRoute.routes())
    // app.use(routesLoader(app, 'public'));
    // app.use(koajwt({}));
    // app.use(routesLoader(app, 'private'));
    
    app.listen(process.env.PORT || 4000);
    console.log('Server listening on port 4000');
})()
