const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');

class Service {
  getById(id, projection, options) {
    return User.findOne({ _id: id }, projection, options);
  }

  findOne(conditions, projection, options) {
    return User.findOne(conditions, projection, options);
  }

  find(conditions, projection, options) {
    return User.find(conditions, projection, options);
  }

  create(user) {
    user.password = bcrypt.hashSync(user.password, 10);
    return User.create(user);
  }

  deleteOne(id) {
    return User.delete({ _id: id });
  }

  updateOne(id, properties) {
    return User.updateOne({ _id: id }, properties, { new: true })
  }

  updateMany(conditions, properties) {
    return User.updateMany(conditions, properties);
  }
}

module.exports = new Service();
