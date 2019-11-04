const { Document } = require('../models/document.model');
const path = require('path');
const storage = require('azure-storage');

const blobService = storage.createBlobService();
class Service {
  findOne(conditions = {}, projection, options) {
    return Document.findOne(conditions, projection, options);
  }

  find(conditons, projection, options) {
    return Document.find(conditons, projection, options);
  }

  async create(document) {
    // const content = new Buffer(document.content).toString('base64');
    // delete document.content;
    // const created = await Document.create(document);

    const uploaded = await new Promise((resolve, reject) => {
      blobService.createBlockBlobFromLocalFile(process.env.BLOBS_CONTAINER, document.name, document.path, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
    // return { ...created, ...uploaded }
    return uploaded
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
