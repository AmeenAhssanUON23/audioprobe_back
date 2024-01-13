const db = require('../config/connection');
const User = db.user;

module.exports = (req, res, next) => {
  User.findOne({where:{
    id:req.userId
}}).then(user => {
        if (user.roleId === 1) {
          next();
          return;
        }
        res.status(403).send({
          message: "Require Admin authorization!"
        });
        return;
    });
  };