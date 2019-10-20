const { Student } = require('../models/student.model');


class Service {
  findOne(id, projection, options) {
    return Student.findOne({ _id: id }, projection, options);
  }

  find(conditons, projection, options) {
    return Student.find(conditons, projection, options)
  }

  create(student) {
    return Student.create(student);
  }

  deleteOne(id) {
    return Student.deleteOne({ _id: id })
  }

  updateOne(id, properties) {
    return Student.updateOne({ _id: id }, properties, { new: true })
  }

  updateMany(conditions, properties) {
    return Student.updateMany(conditions, properties);
  }
}

module.exports = new Service();
