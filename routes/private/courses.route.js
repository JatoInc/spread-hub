const controller = require('../../controllers/course.controller');
const auth = require('../../middlewares/auth.meddleware');
const Router = require('koa-router');

const route = new Router();

route.prefix(`/api/${process.env.BASE_API}/courses`);

route.get('/', controller.list);
route.get('/:id', controller.getById);
route.post('/', controller.create);
route.put('/', controller.updateMany);
route.put('/:id', controller.updateOne);

module.exports = route;