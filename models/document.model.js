const SpreadHubContext = require('../shared/spread-hub-context');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    uploadedAt: { type: Date, required: true },
    approvedAt: Date,
    filePath: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subject: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Subject' }
}, {
    versionKey: false,
    timestamps: true
});

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.DocumentSchema = schema;
module.exports.Document = SpreadHubContext.conn.model('Document', schema);
