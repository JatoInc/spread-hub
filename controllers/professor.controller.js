const { onSuccess, onError, onCreated } = require('../shared/helpers/finalize-request/index')
const ProfessorService = require('../services/professor.service');
const UserService = require('../services/users.service');
const { ObjectId } = require('mongodb')

class Controler {

    async list(ctx) {
        try {
            const query = {};
            const result = await ProfessorService.find(query);
            onSuccess(ctx, result);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async getById(ctx) {
        try {
            const { id } = ctx.params;
            const result = await ProfessorService.getById(ObjectId(id));
            onSuccess(ctx, result);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async create(ctx) {
        try {
            const { details, user } = ctx.request.body

            const createdUser = await UserService.create({ ...user, access_level: 1 });

            const created = await ProfessorService.create({ ...details, user: createdUser._id });
            onCreated(ctx, created);
        } catch (err) {
            console.log('err :', err);
            onError(ctx, err);
        }
    }

    async updateOne(ctx) {
        try {
            const { id } = ctx.params;
            const { body } = ctx;
            await ProfessorService.updateOne(ObjectId(id), body);
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