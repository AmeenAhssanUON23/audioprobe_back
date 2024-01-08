import { database, username, password, host as _host } from './database';
import { Sequelize, DataTypes } from 'sequelize';



// INITIALIZATION--
const sequelize = new Sequelize(
  database, username, password,
  {
    //port:25060,
    host: _host,
    dialect: "mysql", operatorsAliasis: false
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
db.version =  require('../routes/appversion/version.model')(sequelize, DataTypes);

// ASSOCIATIONS--

// db.membersrole.hasOne(db.members, {
//   foreignKey: {
//     allowNull: false
//   },
//   onDelete: 'RESTRICT',
// })
// db.members.belongsTo(db.membersrole);

// db.members.hasMany(db.childrens, {
//   foreignKey: {
//     allowNull: false
//   },
//   onDelete: 'RESTRICT',
// })
// db.childrens.belongsTo(db.members);






// SYNCING--
db.sequelize.sync({ alter: true, force: false })
  .then((result) => {
    //  membersroleinitial();
  //  statusinitial();
  //   extrastypeinitial();
  // extrasstatusinitial();
  // diettypeinitial();
  // stafftypeinitial();

  // supportstatusinitial();
    console.log("--sync done--");
  }).catch(err => {
    console.log(`error:${err}`);
  });


async function membersroleinitial() {
  try {
  await db.membersrole.bulkCreate([
      {
        id: 1,
        type: "Student"
      }, {
        id: 2,
        type: "Non Student"
      }
      , {
        id: 3,
        type: "Student with children"
      }
    ]
    )
  } catch (error) {
    console.log(error.message);
  }
}


async function diettypeinitial() {
  try {
  await db.diettype.bulkCreate([
      {
        id: 1,
        type: "Halal"
      }, {
        id: 2,
        type: "Non Halal"
      }
      , {
        id: 3,
        type: "Veg"
      }
    ]
    )
  } catch (error) {
    console.log(error.message);
  }
}




async function statusinitial() {
  try {
 await db.status.bulkCreate([
      {
        id: 1,
        statustype: "Active"
      }, {
        id: 2,
        statustype: "In-Active"
      }
    ]
    )
  } catch (error) {
    console.log(error.message);
  }
}


async function supportstatusinitial() {
  try {
 await db.spstatus.bulkCreate([
      {
        id: 1,
        statustype: "Open"
      }, {
        id: 2,
        statustype: "In-Progress"
      },
      {
        id: 3,
        statustype: "Closed"
      },
      {
        id: 4,
        statustype: "Verified"
      }
    ]
    )
  } catch (error) {
    console.log(error.message);
  }
}

async function stafftypeinitial() {
  try {
 await db.stafftype.bulkCreate([
      {
        id: 1,
        type: "Distribution"
      }, {
        id: 2,
        type: "Support"
      }
    ]
    )
  } catch (error) {
    console.log(error.message);
  }
}

async function extrastypeinitial() {
  try {
 await db.extrastype.bulkCreate([
      {
        id: 1,
        type: "Weekly"
      }, {
        id: 2,
        type: "Monthly"
      },
      {
        id: 3,
        type: "Twice in a Month"
      }
    ]
    )
  } catch (error) {
    console.log(error.message);
  }
}


async function extrasstatusinitial() {
  try {
 await db.extrasstatus.bulkCreate([
      {
        id: 1,
        status: "Active"
      }, {
        id: 2,
        status: "In-Active"
      }
    ]
    )
  } catch (error) {
    console.log(error.message);
  }
}





export default db;