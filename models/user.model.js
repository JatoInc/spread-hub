const SpreadHubContext = require('../shared/spread-hub-context');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 500 },
  email: { type: String, required: true, unique: true, maxlength: 200 },
  access_level: { type: Number, default: 0, enum: [0, 1, 2, 3] },
  password: { type: String, required: true },
  phone: { type: String, maxlength: 20, required: true },
  address: {
    street: { type: String, required: true },
    number: { type: String, required: true },
    complement: { type: String, maxlength: 200 },
    city: { type: String, required: true },
    state: { type: String, required: true },
    uf: { type: String, max: 2, min: 2 }
  }
},
  {
    timestamps: true
  });

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.UserSchema = schema;
module.exports.User = SpreadHubContext.conn.model('User', schema);
