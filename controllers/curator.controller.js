const { onSuccess, onError, onCreated } = require('../shared/helpers/finalize-request/index')
const StudentService = require('../services/student.service');
const UserService = require('../services/users.service');
const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb');

class Controler {

    async list(ctx) {
        try {
            if (ctx.query._fields) {
                ctx.query._fields = ctx.query._fields.replace(/,/g, ' ');
            }
            const populate = ctx.query._full && ctx.query._full == 'true';
            const result = await StudentService.find({ access_level: 2 }, ctx.query._fields, {}, populate);
            onSuccess(ctx, result);
        } catch (err) {
            console.log(err);
            onError(ctx, err);
        }
    }

    async getById(ctx) {
        try {
            const { id } = ctx.params;
            const populate = ctx.query._full && ctx.query._full == 'true';
            const result = await StudentService.getById(ObjectID(id), ctx.query._fields, {}, populate);
            onSuccess(ctx, result);
        } catch (err) {
            console.log(err);
            onError(ctx, err);
        }
    }

    async setCurator(ctx) {
        try {
            const { id } = ctx.params;
            const student = await StudentService.getById(ObjectID(id))
            await UserService.updateOne(student.user._id, { access_level: 2 });
            ctx.status = 204;
        } catch (err) {
            onError(ctx, err);
        }
    }

    async unsetCurator(ctx) {
        try {
            const { id } = ctx.params;
            const student = await StudentService.getById(ObjectID(id))
            await UserService.updateOne(student.user._id, { access_level: 3 });
            ctx.status = 204;
        } catch (err) {
            onError(ctx, err);
        }
    }
}

module.exports = new Controler();