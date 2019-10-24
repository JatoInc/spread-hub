const controler = require('../../controllers/student.controller');
const Router = require('koa-router');

const route = new Router();

route.prefix(`/api/${process.env.BASE_API}/curators`);

route.post('/:user_id', controler.list);
route.delete('/:user_id', controler.getById);

module.exports = route;