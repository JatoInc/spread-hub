const bcrypt = require('bcrypt');
const crypto = require('crypto')
const UserService = require('../services/users.service');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { onSuccess } = require('../shared/helpers/finalize-request/index');

class Controller {
    async login(ctx) {
        const credentials = ctx.headers.authorization;
        const userAuth = Buffer.from(credentials, 'base64').toString('utf-8').replace('Basic ', '');
        const [email, password] = userAuth.split(':');
        console.log({ email, password });

        const user = await UserService.findOne({ email });
        if (!user || user.length == 0) {
            throw {
                error: true, 
                message: 'Email not found'
            };
        }

        const authenticated = bcrypt.compareSync(password, user.password);

        if (!authenticated) {
            throw {
                error: true,
                message: 'Inavlid password'
            }
        }

        const token = jwt.sign({
            id: user._id,
            access: user.access_level,
            refreshToken: crypto.randomBytes(20).toString('hex')
        }, process.env.JWT_SECRET, { expiresIn: 86400 });

        return onSuccess(ctx, {
            type: 'Bearer',
            token,
            expiresIn: 86400,
            expireDate: new Date(moment().add(86400, 'seconds')).getTime()
        });
    }
}

module.exports = new Controller();
