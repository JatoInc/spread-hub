const { Student } = require('../models/student.model');


class Service {
  async findOne(id, projection, options, populate) {
    if (populate) {
      return Student.findOne({ _id: id }, projection, options)
        .populate(['user', 'course', 'responsible']);
    }
    return Student.findOne({ _id: id }, projection, options)
  }

  async find(conditons, projection, options, populate = false) {
    if (populate) {
      return Student.find(conditons, projection, options)
        .populate(['user', 'course', 'responsible']);
    }
    return Student.find(conditons, projection, options);
  }

  async create(student) {
    return Student.create(student);
  }

  async deleteOne(id) {
    return Student.deleteOne({ _id: id })
  }

  async updateOne(id, properties) {
    return Student.updateOne({ _id: id }, properties, { new: true })
  }

  async updateMany(conditions, properties) {
    return Student.updateMany(conditions, properties);
  }
}

module.exports = new Service();
