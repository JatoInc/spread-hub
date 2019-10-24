const { onSuccess, onError, onCreated } = require('../shared/helpers/finalize-request/index')
const CourseService = require('../services/course.service');
const { ObjectID } = require('mongodb');

class Controler {
    async list(ctx) {
        try {
            const query = {};

            if(ctx.query.name){
                query.name = ctx.query.name
            }

            const result = await CourseService.find(query);
            onSuccess(ctx, result);
        } catch (err) {
            console.log(err);
            onError(ctx, err);
        }
    }

    async getById(ctx) {
        try {
            const { id } = ctx.params;
            const result = await CourseService.findOne(ObjectID(id));
            onSuccess(ctx, result);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async create(ctx) {
        try {
            const created = await CourseService.create(ctx.request.body);
            onCreated(ctx, created);
        } catch (err) {
            console.log(err);

            onError(ctx, err);
        }
    }

    async updateOne(ctx) {
        try {
            const { id } = ctx.params;
            const { body } = ctx.request;
            const updated = await CourseService.updateOne(ObjectID(id), body);
            return onSuccess(ctx, updated);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async updateMany(ctx) {
        try {
            const { body } = ctx.request;

            const updated = await CourseService.updateMany(ctx.query, body);
            return onSuccess(ctx, updated);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async delete(ctx) {
        try {
            const { id } = ctx.params;
            const deleted = await CourseService.deleteOne(ObjectID(id));
        } catch (err) {
            onError(ctx, err);
        }
    }
}

module.exports = new Controler();