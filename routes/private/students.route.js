const controler = require('../../controllers/student.controller');
const Router = require('koa-router');

const route = new Router();

route.prefix(`/api/${process.env.BASE_API}/students`);

route.get('/', controler.list);
route.get('/:id', controler.getById);
route.post('/', controler.create);
route.put('/', controler.updateMany);
route.put('/:id', controler.updateOne);

module.exports = route;