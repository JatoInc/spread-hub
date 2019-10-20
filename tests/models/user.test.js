require('dotenv').config();
const Database = require('../../shared/spread-hub-context');
const bcrypt = require('bcrypt');

(async () => {
    await Database.connect();
    const { User } = require('../../models/user.model');

    const user = {
        name: 'Christian',
        email: 'christianmouraa@gmail.com',
        password: bcrypt.hashSync('asdsaih3434', 10),
        access_level: 1
    }
    
    const created = await User.create(user);
    console.log(created);

})()