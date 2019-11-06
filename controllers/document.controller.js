const { onSuccess, onError } = require('../shared/helpers/finalize-request/index');
const DocumentService = require('../services/document.service');
class Controler {

    async list(ctx) {
        const options = { limit: ctx.query.limit || 10 };

        if(ctx.query.sort_by) {
            options.sort = ctx.query.sort_by;
        }


    }

    async upload(ctx) {
        try {
            console.log(ctx.request.files);
            
            let { files } = ctx.request.files;

            if (!files.length) files = [files];

            const promises = files.map(file => DocumentService.create(file));
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