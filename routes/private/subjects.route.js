const controller = require('../../controllers/subject.controller');
const auth = require('../../middlewares/auth.meddleware');
const Router = require('koa-router');

const route = new Router();

route.prefix(`/api/${process.env.BASE_API}/subjects`);

route.get('/', auth.atLeastStudent, controller.list);
route.get('/:id', auth.atLeastAdmin, controller.getById);
// route.get('/courses/:id', controller.getSubjectsFromCourse);
route.post('/', auth.atLeastAdmin, controller.create);
route.put('/:id', auth.atLeastAdmin, controller.updateOne);

module.exports = route;