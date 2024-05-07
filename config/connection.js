const { database, username, password, host } = require('./database');
const { Sequelize, DataTypes } = require('sequelize');


// INITIALIZATION--
// const sequelize = new Sequelize(
//   "mysql://neut7t6lqvzzave0:yeez9b85n2t25vpo@h1use0ulyws4lqr1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/rb9aumtr04c2cjd5",
//   {});
// INITIALIZATION--
const sequelize = new Sequelize(
  database, username, password,
  {
    port:3306,
    host: host,
    dialect: "mysql", operatorsAliasis: false,
dialectOptions: {
    ssl: {
      require: true, // Require SSL
      rejectUnauthorized: false // Disable SSL certificate verification (for self-signed certificates)
    }
  }
  });

// AUTHENTICATION--
sequelize.authenticate()
  .then(() => {
    console.log('--database connected--');
  }).catch(err =>
    console.log(`Error:${err}`));

// CONNECTION-PROVIDER--
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('../routes/user/user.model')(sequelize, DataTypes);
db.role = require('../routes/user/roles/roles.model')(sequelize, DataTypes);
db.version = require('../routes/appversion/version.model')(sequelize, DataTypes);
db.staff = require('../routes/staff/staff.model')(sequelize, DataTypes);
db.clients = require('../routes/clients/clients.model')(sequelize, DataTypes);
db.appointments = require('../routes/appointments/appointments.model')(sequelize, DataTypes);
db.analysis = require('../routes/analysis/analysis.model')(sequelize, DataTypes);
db.availabilty = require('../routes/availabilty/availability.model')(sequelize, DataTypes);

// ASSOCIATIONS--

// <-----role - user Association------->
db.role.hasMany(db.user, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.user.belongsTo(db.role);

db.ROLES = ["Admin", "Therapist"];


// <-----user - staff Association------->
db.user.hasOne(db.staff, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.staff.belongsTo(db.user);


// <-----user - availabilty Association------->
db.user.hasMany(db.availabilty, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.availabilty.belongsTo(db.user);


// <-----user - clients Association------->
db.user.hasMany(db.clients, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.clients.belongsTo(db.user);


// <-----user - clients Association------->
db.user.hasMany(db.appointments);
db.appointments.belongsTo(db.user);

db.clients.hasMany(db.appointments);
db.appointments.belongsTo(db.clients);

// <-----clients - analysis Association------->
db.clients.hasMany(db.analysis, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.analysis.belongsTo(db.clients);



// SYNCING DATABASE--
db.sequelize.sync({ alter: true, force: false })
  .then((result) => {
    // userRoleinitial();
    // versionInitial();
    console.log("--sync done--");
  }).catch(err => {
    console.log(`error:${err}`);
  });


async function userRoleinitial() {
  try {
    await db.role.bulkCreate([
      {
        id: 1,
        name: "Admin"
      }, {
        id: 2,
        name: "Therapist"
      }
    ]
    )
  } catch (error) {
    console.log(error.message);
  }
}
async function versionInitial() {
  try {
    await db.version.create(
      {
        id: 1,
        status: "Active",
        version: "1",
        supportingVersion:"1",
        supportNumber: "07388408419"
      },
    )
  } catch (error) {
    console.log(error.message);
  }
}


module.exports = db;
