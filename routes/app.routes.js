const users = require('./user/user.router');
const version = require('./appversion/version.router');
const analysis = require('./analysis/analysis.router');
const clients = require('./clients/clients.router');
const appointments = require('./appointments/appointments.router');
const staff = require('./staff/staff.router');
const availability = require('./availabilty/availability.router');


// API routes --
function createRoutes(app) {
    app.use('/api',users,version,analysis,clients,appointments,staff,availability);
}

// API routes for testing --
function createRoutesNoAuth(app) {
   app.use('/testapi',users,version,analysis,clients,appointments,staff,availability);
}

module.exports = { createRoutes};