const onSuccess = require('./success.handler');
const onError = require('./error.handler');
const onCreated = require('./created.handler');
// const onDeleted = require('./deleted.handler');

module.exports = {
    onSuccess,
    onError,
    onCreated
}