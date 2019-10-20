const SpreadHubContext = require('../shared/spread-hub-context');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    register: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    course: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' },
    responsible: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
});

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.StudentSchema = schema;
module.exports.Student = SpreadHubContext.conn.model('Student', schema);
