const { onSuccess, onError } = require('../shared/helpers/finalize-request/index');
const DocumentService = require('../services/document.service');
const getUser = require('../shared/helpers/getUser');
class Controler {

    async list(ctx) {
        try {
            const options = { limit: ctx.query.limit || 10 };

            if (ctx.query.sort_by) {
                options.sort = ctx.query.sort_by;
            }

            const documents = await DocumentService.find({}, {}, options);
            return onSuccess(ctx, documents)
        } catch (err) {
            console.log(err)
            return onError(ctx, err.message);
        }
    }

    async upload(ctx) {
        try {
            const userId = getUser(ctx.headers.authorization);
            let { files } = ctx.request.files;

            if (!files.length) files = [files];

            const promises = files.map(file => DocumentService.create(file, userId));
            // const res = await DocumentService.create();

            const res = await Promise.all(promises);
            return onSuccess(ctx, res);
        } catch (err) {
            console.log(err)
            return onError(ctx, err.message);
        }
    }

    async remove(ctx) {

    }
}

module.exports = new Controler();