module.exports = (obj) => {
    try {
        return JSON.parse(obj);
    } catch (err) {
        return false
    }
}
