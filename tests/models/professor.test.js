require('dotenv').config();
const Database = require('../../shared/spread-hub-context');
const { ObjectId } = require('mongodb');

(async () => {
    await Database.connect();
    const { Professor } = require('../../models/professor.model');

    const payload = {
        register: '54235623624',
        user: ObjectId('5dac97d375d0bf74dca9f042'),
        subject: [ObjectId('5daca1ee44be501c9c92f3e0')]
    }

    const created = await Professor.create(payload);
    console.log(created);

})()