const fs = require('fs');

module.exports = (app, type) => {
    fs.readdir(`${__dirname}/routes/${type}`, (err, files) => {
        files.forEach(file => {
            if (err) throw err;
            let route = require(`${__dirname}/routes/${type}/${file}`.replace(/\\/g, '/'));
            console.log(`${__dirname}/routes/${type}/${file}`.replace(/\\/g, '/'));
            app.use(route.routes());
        });
    });
}