const db = require('../config/connection');
const Staff = db.staff;

module.exports =  (req, res, next) => {
  Staff.findByPk(req.userId).then(staff => {
          if (staff) {
            next();
            return;
          }
        res.status(403).send({
          message: "Require staff authorization!"
        });
        return;
    });
  };