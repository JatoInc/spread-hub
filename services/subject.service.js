const { Subject } = require('../models/subject.model');


class Service {
  getById(id, projection, options, populate) {
    if (populate) {
      return Subject.findOne({ _id: id }, projection, options)
        .populate('course');
    }
    return Subject.findOne({ _id: id }, projection, options);
  }

  find(conditons, projection, options, populate) {
    if (populate) {
      return Subject.find(conditons, projection, options)
        .populate('course');
    }
    return Subject.find(conditons, projection, options);
  }

  create(subject) {
    return Subject.create(subject);
  }

  deleteOne(id) {
    return Subject.deleteOne({ _id: id })
  }

  updateOne(id, properties) {
    return Subject.updateOne({ _id: id }, properties, { new: true })
  }

  updateMany(conditions, properties) {
    return Subject.updateMany(conditions, properties);
  }
}

module.exports = new Service();
