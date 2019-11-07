const controller = require('../../controllers/student.controller');
const auth = require('../../middlewares/auth.meddleware');
const Router = require('koa-router');

const route = new Router();

route.prefix(`/api/${process.env.BASE_API}/students`);

route.get('/', auth.atLeastProfessor, controller.list);
route.get('/:id', auth.atLeastProfessor, controller.getById);
route.post('/', auth.atLeastAdmin, controller.create);
route.put('/:id', auth.atLeastAdmin, controller.updateOne);
route.delete('/:id', auth.atLeastAdmin, controller.delete);

module.exports = route;