const SpreadHubContext = require('../shared/spread-hub-context');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    course: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' }]
}, { versionKey: false, 
    timestamps: true });

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.SubjectSchema = schema;
module.exports.Subject = SpreadHubContext.conn.model('Subject', schema);
