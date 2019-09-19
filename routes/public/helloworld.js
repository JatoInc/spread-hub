const controler = require('../../controllers/helloworld.controller');
const Router = require('koa-router');

const route = new Router();

route.prefix(`/api/${process.env.BASE_API}/hello-world`);

route.get('/', controler.helloWorld);

module.exports = route;