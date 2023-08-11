module.exports = function (app) {
    const tinyurl = require("./../controllers/tinyurl.controllers");
    app.route('/tinyurl')
    .post(tinyurl.create);
    app.param('shortKey', tinyurl.fetch);
    app.route('/tinyurl/:shortKey')
    .put(tinyurl.update)
    .delete(tinyurl.delete)
    .get(tinyurl.redirect);
};