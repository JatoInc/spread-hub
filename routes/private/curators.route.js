const controller = require('../../controllers/curator.controller');
const Router = require('koa-router');

const route = new Router();

route.prefix(`/api/${process.env.BASE_API}/curators`);

route.get('/', controller.list);
route.get('/:id', controller.getById);
route.post('/:id', controller.setCurator);
route.delete('/:id', controller.unsetCurator);

module.exports = route;