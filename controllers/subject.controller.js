const { onSuccess, onError, onCreated } = require('../shared/helpers/finalize-request/index')
const SubjectService = require('../services/subject.service');
const { ObjectId } = require('mongodb');

class Controler {
    async list(ctx) {
        try {
            const query = {};

            if (ctx.query.name) {
                query.name = ctx.query.name
            }

            if (ctx.query.course) {
                query.course.$in = ctx.query.course.split(',');
            }

            if (ctx.query._fields) {
                ctx.query._fields = ctx.query._fields.replace(/,/g, ' ');
            }

            const populate = ctx.query._full && ctx.query._full == 'true';

            const result = await SubjectService.find(query, ctx.query._fields, {}, populate);
            onSuccess(ctx, result);
        } catch (err) {
            console.log(err);
            onError(ctx, err);
        }
    }

    async getById(ctx) {
        try {
            const { id } = ctx.params;

            if (ctx.query._fields) {
                ctx.query._fields = ctx.query._fields.replace(/,/g, ' ');
            }

            if (ctx.query._fields) {
                ctx.query._fields = ctx.query._fields.replace(/,/g, ' ');
            }

            const populate = ctx.query._full && ctx.query._full == 'true';
            const result = await SubjectService.getById(ObjectId(id), ctx.query._fields, {}, populate);
            onSuccess(ctx, result);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async getSubjectsFromCourse(ctx) {
        try {
            const { id } = ctx.params;
            // if (!ctx.query.subjects) {
            //     throw 'Subjects is required query param!';
            // }
            const query = {
                course: {
                    $in: [ObjectId(id)]
                }
            }
            const subjects = await SubjectService.find(query);
            return onSuccess(ctx, subjects)
        } catch (err) {
            console.log(err);
            onError(ctx, err);
        }
    }

    async create(ctx) {
        try {
            let { body } = ctx.request
            body.course = body.course.map(c => ObjectId(c));

            const created = await SubjectService.create(body);
            onCreated(ctx, created);
        } catch (err) {
            console.log(err);

            onError(ctx, err);
        }
    }

    async updateOne(ctx) {
        try {
            const { id } = ctx.params;
            let { body } = ctx.request;

            if (body.course) {
                body.course = body.course.map(c => ObjectId(c));
            }
            const updated = await SubjectService.updateOne(ObjectId(id), body);
            return onSuccess(ctx, updated);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async updateMany(ctx) {
        try {
            const { body } = ctx.request;

            const updated = await SubjectService.updateMany(ctx.query, body);
            return onSuccess(ctx, updated);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async delete(ctx) {
        try {
            const { id } = ctx.params;
            const deleted = await SubjectService.deleteOne(ObjectId(id));
        } catch (err) {
            onError(ctx, err);
        }
    }
}

module.exports = new Controler();