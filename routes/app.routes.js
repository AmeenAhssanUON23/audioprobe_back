const users = require('./user/user.router');
const version = require('./appversion/version.router');
const analysis = require('./analysis/analysis.router');
const clients = require('./clients/clients.router');
const appointments = require('./appointments/appointments.router');


// API routes --
function createRoutes(app) {
    app.use('/api',users,version,analysis,clients,appointments);
}

// API routes for testing --
function createRoutesNoAuth(app) {
   app.use('/testapi',users,version,analysis,clients,appointments);
}

module.exports = { createRoutes};