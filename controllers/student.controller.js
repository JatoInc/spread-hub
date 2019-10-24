const { onSuccess, onError, onCreated } = require('../shared/helpers/finalize-request/index')
const StudentService = require('../services/student.service');
const UserService = require('../services/users.service');
const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb');

class Controler {

    async list(ctx) {
        try {
            if(ctx.query._fields) {
                ctx.query._fields = ctx.query._fields.replace(/,/g, ' ');
            }

            const result = await StudentService.find({}, ctx.query._fields, {}, ctx.query._full);
            onSuccess(ctx, result);
        } catch (err) {
            console.log(err);
            onError(ctx, err);
        }
    }

    async getById(ctx) {
        try {
            const { id } = ctx.params;
            const result = await StudentService.findOne(ObjectID(id));
            onSuccess(ctx, result);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async create(ctx) {
        try {
            const userPayload = {
                name: ctx.request.body.name,
                email: ctx.request.body.email,
                address: ctx.request.body.address,
                password: bcrypt.hashSync(ctx.request.body.password, 10),
                phone: ctx.request.body.phone,
                access_level: 3
            }

            const createdUser = await UserService.create(userPayload);

            const studentPayload = {
                user: createdUser._id,
                register: ctx.request.body.register,
                course: ObjectID(ctx.request.body.course)
            }

            const created = await StudentService.create(studentPayload);
            onCreated(ctx, created);
        } catch (err) {
            console.log(err);
            
            onError(ctx, err);
        }
    }

    async updateOne(ctx) {
        try {
            const { id } = ctx.params;
            const { body } = ctx;
            const updated = await StudentService.updateOne(ObjectID(id), body);
            return onSuccess(ctx, updated);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async updateMany(ctx) {
        try {
            const { query, body } = ctx;
            const updated = await StudentService.updateMany(query, body);
            return onSuccess(ctx, updated);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async delete(ctx) {
        try {
            const { id } = ctx.params;
            const deleted = await StudentService.deleteOne(ObjectID(id));
        } catch (err) {
            onError(ctx, err);
        }
    }

    async setCurator(ctx) {
        try {
            const { user_id } = ctx.params;
            await StudentService.updateOne(ObjectID(user_id), { access_level: 2 });
            return onSuccess(ctx, {});
        } catch (err) {
            onError(ctx, err);
        }
    }

    async deleteCurator(ctx) {
        try {
            const { user_id } = ctx.params;
            await StudentService.updateOne(ObjectID(user_id), { access_level: 3 });
            return onSuccess(ctx, {});
        } catch (err) {
            onError(ctx, err);
        }
    }
}

module.exports = new Controler();