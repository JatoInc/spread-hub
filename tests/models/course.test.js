require('dotenv').config();
const Database = require('../../shared/spread-hub-context');

(async () => {
    await Database.connect();
    const { Course } = require('../../models/course.model');

    const payload = {
        name: 'Análise e Desenvolvimento de Sistemas',
    }
    
    const created = await Course.create(payload);
    console.log(created);

})()