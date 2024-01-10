const { database, username, password,_host } = require('./database');
const { Sequelize, DataTypes }= require('sequelize');



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

// db.user = require('../routes/user/user.model')(sequelize, DataTypes);
// db.version =  require('../routes/appversion/version.model')(sequelize, DataTypes);

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





module.exports =  db;