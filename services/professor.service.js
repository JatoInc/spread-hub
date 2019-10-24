const { Professor } = require('../models/professor.model');

class Service {
  findOne(conditons, projection, options) {
    return Professor.findOne(conditons, projection, options);
  }

  getById(id, projection, options, populate) {
    if (populate) {
      return Professor.findOne({ _id: id }, projection, options)
        .populate(['subject', 'user']);
    }
    return Professor.findOne({ _id: id }, projection, options);
  }

  find(conditons, projection, options, populate) {
    if (populate) {
      return Professor.find(conditons, projection, options)
        .populate(['subject', 'user']);
    }
    return Professor.find(conditons, projection, options);
  }

  create(professor) {
    return Professor.create(professor);
  }

  deleteOne(id) {
    return Professor.deleteOne({ _id: id })
  }

  updateOne(id, properties) {
    return Professor.updateOne({ _id: id }, properties, { new: true })
  }

  updateMany(conditions, properties) {
    return Professor.updateMany(conditions, properties);
  }

}

module.exports = new Service();
