const SpreadHubContext = require('../shared/spread-hub-context');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
    register: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    course: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' },
    responsible: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
}, { versionKey: false, 
    timestamps: true });

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.StudentSchema = schema;
module.exports.Student = SpreadHubContext.conn.model('Student', schema);
