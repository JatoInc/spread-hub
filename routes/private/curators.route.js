const controller = require('../../controllers/curator.controller');
const auth = require('../../middlewares/auth.meddleware');
const Router = require('koa-router');

const route = new Router();

route.prefix(`/api/${process.env.BASE_API}/curators`);

route.get('/', auth.atLeastProfessor, controller.list);
route.get('/:id', auth.atLeastProfessor, controller.getById);
route.post('/:id', auth.atLeastProfessor, controller.setCurator);
route.delete('/:id', auth.atLeastProfessor, controller.unsetCurator);

module.exports = route;