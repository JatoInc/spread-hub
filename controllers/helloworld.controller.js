// const { onSuccess, onError } = require('../../shared/handlers/index');

class Controler {
    
    helloWorld(ctx) {
        ctx.status = 200;
        ctx.body = 'Hello World!'
        return;
    }
}

module.exports = new Controler();