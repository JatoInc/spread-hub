require('dotenv').config();
const Database = require('../../shared/spread-hub-context');
const { ObjectId } = require('mongodb');

(async () => {
    await Database.connect();
    const { Subject } = require('../../models/subject.model');

    const payload = {
        name: 'Laboratório de engenharia de software',
        couse: ObjectId('5daca0cc40b73a6dc82f02fe')
    }
    
    const created = await Subject.create(payload);
    console.log(created);

})()