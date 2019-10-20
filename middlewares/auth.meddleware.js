const bcrypt = require('bcrypt');
const UserService = require('../services/users.service');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class Auth {
    login(credentials) {
        const userAuth = Buffer.from(credentials, 'base64').toString('utf8');

        const [email, password] = userAuth.split(':');

        const user = await UserService.find({ email });

        if (!user || user.length == 0) {
            throw 'Email not found';
        }

        const authenticated = bcrypt.compareSync(password, user.password);

        if (!authenticated) {
            throw 'Inavlid password'
        }

        const token = jwt.sign({
            id: user._id,
            type: user.type,
            refreshToken: crypto.randomBytes(20).toString('hex')
        }, process.env.JWT_SECRET, { expiresIn: 86400 });

        return token
    }

    refresh(token) {
        
    }
}

module.exports = new Auth();