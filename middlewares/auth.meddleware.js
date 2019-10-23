const jwt = require('jsonwebtoken');

const authenticate = (ctx, next, level) => {
    const [, token] = ctx.headers.authorization.split(' ');
    const data = jwt.decode(token);
    if(data.access <= level) {
        return next()
    }
    ctx.status = 401
    ctx.body = {
        error: true,
        message: 'Access denied: User does not have permision to access this resource!'
    }
}
class Auth {

    atLeastStudent(ctx, next) {
        return authenticate(ctx, next, 3);
    }

    atLeastCurator(ctx, next) {
        return authenticate(ctx, next, 2);
    }

    atLeastProfessor(ctx, next) {
        return authenticate(ctx, next, 1);
    }

    atLeastAdmin(ctx, next) {
        return authenticate(ctx, next, 0);
    }
}

module.exports = new Auth();