const SpreadHubContext = require('../shared/spread-hub-context');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
    register: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    subject: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
});

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.ProfessorSchema = schema;
module.exports.Professor = SpreadHubContext.conn.model('Professor', schema);
