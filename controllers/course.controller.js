const { onSuccess, onError, onCreated } = require('../shared/helpers/finalize-request/index')
const CourseService = require('../services/course.service');

class Controler {

    async list(ctx) {
        const query = {};

        query.name = ctx.query.name;

        const result = await CourseService.find(query);
        onSuccess(ctx, result);
    }

    async getById(ctx) {

    }

    async create(ctx) {

    }
}

module.exports = new Controler();