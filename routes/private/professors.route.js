const controler = require('../../controllers/professor.controller');
const auth = require('../../middlewares/auth.meddleware');
const Router = require('koa-router');

const route = new Router();

route.prefix(`/api/${process.env.BASE_API}/professors`);

route.get('/', auth.atLeastAdmin, controler.list);
route.get('/:id', auth.atLeastAdmin, controler.getById);
route.post('/', auth.atLeastAdmin, controler.create);
route.put('/:id', auth.atLeastAdmin, controler.updateOne);
route.delete('/:id', auth.atLeastAdmin, controler.delete);

module.exports = route;