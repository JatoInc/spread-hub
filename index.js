require('dotenv').config();
const http = require('http');
const Koa = require('koa');
const helloWorldRoutes = require('./routes/public/helloworld');
// const koajwt = require('koa-jwt');
// const { loadRoutes } = require('./routesLoader');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

http.createServer(app.callback());

app.use(bodyParser());
app.use(helloWorldRoutes.routes());
// loadRoutes(app, 'publics');
// app.use(koajwt({}));
// loadRoutes(app, 'privates');

app.listen(process.env.PORT || 4000);
console.log('Server listening on port 4000');
