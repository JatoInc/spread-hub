const Mongoose = require('mongoose');

Mongoose.Promise = global.Promise;

const mongoConfig = {
    useNewUrlParser: true,
    autoReconnect: true
}

class SpreadHubContext {

    static get conn() {
        if (!SpreadHubContext.connection) throw new Error('SpreadHubContext is not connected!');
        return SpreadHubContext.connection;
    }

    static connect() {
        const cs = process.env.MONGO_PORTAL;        
        SpreadHubContext.connection = Mongoose.createConnection(cs, mongoConfig);
    }
}

module.exports = SpreadHubContext;
