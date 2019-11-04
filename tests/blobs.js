require('dotenv').config();

const fs = require('fs');
const storage = require('azure-storage');

const path = 'C:/Users/linkapi/Desktop/adesivos-qualquer-personagem-adesivo.jpg'

const blobService = storage.createBlobService();

(async() => {
    // const content = new Buffer(fs.createReadStream(path)).toString('base64');
    // return console.log('content :', fs.readFileSync(path).toString('base64'));
    let content = fs.createReadStream(path);
    
    // delete document.content;
    // const created = await Document.create(document);
    
    const uploaded = await new Promise((resolve, reject) => {
      blobService.createBlockBlobFromLocalFile(process.env.BLOBS_CONTAINER, 'tesstttt', path, {contentSettings: { contentType: 'image/jpeg' }}, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
    console.log(uploaded);
})()