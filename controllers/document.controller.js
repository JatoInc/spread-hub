// const { onSuccess, onError } = require('../../shared/handlers/index');
const DocumentService = require('../services/document.service');
class Controler {

    async upload(ctx) {
        let { files } = ctx.request.files;

        if (!files.length) files = [files];

        const promises = files.map(file => DocumentService.create(file));
        // const res = await DocumentService.create();

        const res = await Promise.all(promises);
        ctx.status = 200;
        ctx.body = res
    }
}

module.exports = new Controler();