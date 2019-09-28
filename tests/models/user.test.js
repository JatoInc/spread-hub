require('dotenv').config();
const Database = require('../../shared/spread-hub-context');

(async () => {
    await Database.connect();
    const { User } = require('../../models/user.model');

    const user = {
        // name: 'Christian',
        email: 'hehehe@meuemail.com',
        password: 'asdsaih3434'
    }
    
    const created = await User.create(user);
    console.log(created);

})()