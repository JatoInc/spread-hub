require('dotenv').config();
const Database = require('../../shared/spread-hub-context');
// const UserService = require('../../services/users.service')
const bcrypt = require('bcrypt');

(async () => {
    await Database.connect();
    const { User } = require('../../models/user.model');

    const user = {
        name: 'Christian',
        email: 'christianmouraa@gmail.com',
        password: bcrypt.hashSync('teste@123', 10),
        access_level: 1,
        phone: '13999999999',
        address: {
            street: 'Rua dos teste',
            number: '123',
            complement: 'teste',
            city: 'Cidade dos testes',
            state: 'Estado teste',
            uf: 'TT'
        }
    }

    const created = await User.create(user);
    console.log(created);
})()