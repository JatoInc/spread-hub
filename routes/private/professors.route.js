const controler = require('../../controllers/professor.controller');
const auth = require('../../middlewares/auth.meddleware');
const Router = require('koa-router');

const route = new Router();

route.prefix(`/api/${process.env.BASE_API}/professors`);

route.get('/', controler.list);
route.get('/:id', controler.getById);
route.post('/', controler.create);
route.put('/:id', controler.updateOne);
route.delete('/:id', controler.delete);

module.exports = route;