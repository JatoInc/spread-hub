const { Student } = require('../models/student.model');

class Service {
  async findOne(conditions, projection, options, populate) {
    if (populate) {
      return Student.findOne(conditions, projection, options)
        .populate(['user', 'course', 'responsible']);
    }
    return Student.findOne({ _id: id }, projection, options)
  }

  async getById(id, projection, options, populate) {
    if (populate) {
      return Student.findOne({ _id: id }, projection, options)
        .populate(['user', 'course', 'responsible']);
    }
    return Student.findOne({ _id: id }, projection, options)
  }

  // getByAccessLevel(level, projection, options) {
  //   return Student.findOne({ _id: id }, projection, options)
  //       .populate([{'user', }, 'course', 'responsible']);
  // }

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
    return Student.deleteById({ _id: id })
  }

  async updateOne(id, properties) {
    return Student.updateOne({ _id: id }, properties, { new: true })
  }

  async updateMany(conditions, properties) {
    return Student.updateMany(conditions, properties);
  }
}

module.exports = new Service();
