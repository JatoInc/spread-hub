// const { onSuccess, onError } = require('../../shared/handlers/index');

class Controler {

    helloWorld(ctx) {
        ctx.status = 200;
        ctx.headers = {'Content-Type':'application/json', crossDomain: true};
        ctx.body = { message: 'Hello World!' }
        return;
    }
}

module.exports = new Controler();