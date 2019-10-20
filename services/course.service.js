const { Course } = require('../models/course.model');


class Service {
  findOne(id, projection, options) {
    return Course.findOne({ _id: id }, projection, options);
  }

  find(conditons, projection, options) {
    return Course.find(conditons, projection, options)
  }

  create(course) {
    return Course.create(course);
  }

  deleteOne(id) {
    return Course.deleteOne({ _id: id })
  }

  updateOne(id, properties) {
    return Course.updateOne({ _id: id }, properties, { new: true })
  }

  updateMany(conditions, properties) {
    return Course.updateMany(conditions, properties);
  }

}

module.exports = new Service();
