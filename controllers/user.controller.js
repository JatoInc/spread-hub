const { onSuccess, onError, onCreated } = require('../shared/helpers/finalize-request/index');
const UserService = require('../services/users.service');
const { ObjectId } = require('mongodb')

class Controler {

    async list(ctx) {
        try {
            const { query } = ctx;
            const users = await UserService.find(query);
            
            users.forEach(user => {
                user.password = null
            });

            onSuccess(ctx, users);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async getById(ctx) {
        try {
            const { id } = ctx.params;
            const user = await UserService.getById(ObjectId(id));
            user.password = null;
            onSuccess(ctx, user);
        } catch (err) {
            onError(ctx, err);
        }
    }
}

module.exports = new Controler();