const users = require('./user/user.router');




function createRoutes(app) {
    app.use('/api',users);
}

function createRoutesNoAuth(app) {
   app.use('/appapi',users);
}

module.exports = { createRoutes : createRoutes};