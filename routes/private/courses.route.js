const controller = require('../../controllers/course.controller');
const auth = require('../../middlewares/auth.meddleware');
const Router = require('koa-router');

const route = new Router();

route.prefix(`/api/${process.env.BASE_API}/courses`);

route.get('/', auth.atLeastAdmin, controller.list);
route.get('/:id', auth.atLeastAdmin, controller.getById);
route.post('/', auth.atLeastAdmin, controller.create);
route.put('/:id', auth.atLeastAdmin, controller.updateOne);

module.exports = route;