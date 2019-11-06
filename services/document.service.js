const { Document } = require('../models/document.model');
const path = require('path');
const storage = require('azure-storage');

const blobService = storage.createBlobService();
const { ObjectId } = require('mongodb');
class Service {
  findOne(conditions = {}, projection, options) {
    return Document.findOne(conditions, projection, options);
  }

  find(conditons, projection, options) {
    return Document.find(conditons, projection, options);
  }

  async create(document, user, subject) {
    const timestamp = Date.now();
    const blobName = `${document.name}_${timestamp}`

    const uploadResult = await new Promise((resolve, reject) => {
      blobService.createBlockBlobFromLocalFile(process.env.BLOBS_CONTAINER, blobName, document.path, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });

    const documentPayload = {
      name: document.name,
      uploadResultAt: new Date(timestamp),
      filePath: `${proccess.env.BLOBS_RESOURCE_BASE_URL}/${uploadResult.container}/${uploadResult.name}`,
      user: ObjectId(user),
      subject: ObjectId(subject)
    }

    const created = await Document.create(documentPayload);
    return { ...created, ...uploadResult }
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
