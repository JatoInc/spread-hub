const { Document } = require('../models/document.model');


class Service {
  findOne(id, projection, options) {
    return Document.findOne({ _id: id }, projection, options);
  }

  find(conditons, projection, options) {
    return Document.find(conditons, projection, options)
  }

  create(document) {
    return Document.create(document);
  }

  deleteOne(id) {
    return Document.deleteOne({ _id: id })
  }

  updateOne(id, properties) {
    return Document.updateOne({ _id: id }, properties, { new: true })
  }

  updateMany(conditions, properties) {
    return Document.updateMany(conditions, properties);
  }
}

module.exports = new Service();
