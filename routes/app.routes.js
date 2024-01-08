const users = require('./user/user.router');
const members = require('./members/members.router');
const university = require('./members/university/university.router');
const staff = require('./staff/staff.router');
const events = require('./events/events.router');
const distributionslog = require('./distributionslog/distributionslog.router');
const extras = require('./extras/extras.router');
const eventslog = require('./eventslog/eventslog.router');
const support  = require('./support/support.router');



function createRoutes(app) {
    app.use('/api',);
}

//function createRoutesNoAuth(app) {
  //  app.use('/appapi',users,members,university,staff,events,distributionslog,extras,eventslog,support);
//}

module.exports = { createRoutes : createRoutes};