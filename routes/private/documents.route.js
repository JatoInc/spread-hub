const controller = require('../../controllers/document.controller');
const auth = require('../../middlewares/auth.meddleware');
const Router = require('koa-router');

const route = new Router();

route.prefix(`/api/${process.env.BASE_API}/documents`);

// route.get('/', controller.list);
// route.get('/:id', controller.getById);
route.post('/', controller.upload);
// route.put('/', controller.updateMany);
// route.put('/:id', controller.updateOne);

module.exports = route;