const { onSuccess, onError, onCreated } = require('../shared/helpers/finalize-request/index')
const ProfessorService = require('../services/professor.service');
const UserService = require('../services/users.service');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

class Controler {

    async list(ctx) {
        try {
            if (ctx.query._fields) {
                ctx.query._fields = ctx.query._fields.replace(/,/g, ' ');
            }

            const populate = ctx.query._full && ctx.query._full == 'true';

            const query = {};
            const result = await ProfessorService.find(query, ctx.query._fields, {}, populate);
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

            const populate = ctx.query._full && ctx.query._full == 'true';
            const result = await ProfessorService.getById(ObjectId(id), ctx.query._fields, {}, populate);
            onSuccess(ctx, result);
        } catch (err) {
            console.log(err);
            onError(ctx, err);
        }
    }

    async create(ctx) {
        try {
            const { body } = ctx.request;
            const user = { ...body.user }
            delete body.user;

            user.password = bcrypt.hashSync(user.password, 10);

            const createdUser = await UserService.create({ ...user, access_level: 1 });
            
            body.subject = body.subject.map(s => s = ObjectId(s));
            const created = await ProfessorService.create({ ...body, user: createdUser._id });
            onCreated(ctx, created);
        } catch (err) {
            console.log('err :', err);
            onError(ctx, err);
        }
    }

    async updateOne(ctx) {
        try {
            const { id } = ctx.params;
            await ProfessorService.updateOne(ObjectId(id), ctx.request.body);
            ctx.status = 204;
        } catch (err) {
            onError(ctx, err);
        }
    }

    async updateMany(ctx) {
        try {
            const { query, body } = ctx;
            await ProfessorService.updateMany(query, body);
            ctx.status = 204;
        } catch (err) {
            onError(ctx, err);
        }
    }

    async delete(ctx) {
        try {
            const { id } = ctx.params;
            const professor = await ProfessorService.getById(id);
            await UserService.deleteOne(professor.user);
            await ProfessorService.deleteOne(ObjectId(id));
            ctx.status = 204;
        } catch (err) {
            console.log(err)
            onError(ctx, err);
        }
    }
}

module.exports = new Controler();