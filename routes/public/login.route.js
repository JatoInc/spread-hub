const controler = require('../../controllers/login.controller');
const Router = require('koa-router');

const route = new Router();

route.prefix(`/api/${process.env.BASE_API}/login`);

route.post('/', controler.login);

module.exports = route;