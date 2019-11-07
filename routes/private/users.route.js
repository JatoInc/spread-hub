const controler = require('../../controllers/user.controller');
const auth = require('../../middlewares/auth.meddleware');
const Router = require('koa-router');

const route = new Router();

route.prefix(`/api/${process.env.BASE_API}/users`);

route.get('/', auth.atLeastAdmin, controler.list);
route.get('/:id', auth.atLeastAdmin, controler.getById);

module.exports = route;