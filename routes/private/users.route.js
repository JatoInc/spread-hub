const controler = require('../../controllers/user.controller');
const Router = require('koa-router');

const route = new Router();

route.prefix(`/api/${process.env.BASE_API}/users`);

route.get('/', controler.list);
route.get('/:id', controler.getById);

module.exports = route;