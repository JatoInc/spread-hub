require('dotenv').config();
const Database = require('../shared/spread-hub-context');

(async () => {
    await Database.connect();
    const { User } = require('../models/user.model');
    const users = await User.find({}, {}, { sort: 'access_level'});
        // .limit(1)
    console.log('users :', users);
})()