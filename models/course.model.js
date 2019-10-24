const SpreadHubContext = require('../shared/spread-hub-context');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
    name: { type: String, required: true }
}, { versionKey: false, 
    timestamps: true });

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.CourseSchema = schema;
module.exports.Course = SpreadHubContext.conn.model('Course', schema);
