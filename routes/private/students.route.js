const controller = require('../../controllers/student.controller');
const Router = require('koa-router');

const route = new Router();

route.prefix(`/api/${process.env.BASE_API}/students`);

route.get('/', controller.list);
route.get('/:id', controller.getById);
route.post('/', controller.create);
route.put('/:id', controller.updateOne);
route.delete('/:id', controller.delete);

module.exports = route;