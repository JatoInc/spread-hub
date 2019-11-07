const jwt = require('jsonwebtoken');

module.exports = (token) => {
    token = token.replace('Bearer ', '');
    const data = jwt.decode(token);
    return data._id;
}