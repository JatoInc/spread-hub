const SpreadHubContext = require('../shared/spread-hub-context');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    access_level: [{ type: Number, default: 0, enum: [0, 1, 2] }],
    password: { type: String, required: true }
});

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.UserSchema = schema;
module.exports.User = SpreadHubContext.conn.model('User', schema);
