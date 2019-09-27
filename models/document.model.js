const SpreadHubContext = require('../shared/spread-hub-context');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    approvedAt: { type: Date },
    filePath: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    subject: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Subject' }
});

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.DocumentSchema = schema;
module.exports.Document = SpreadHubContext.conn.model('Document', schema);
