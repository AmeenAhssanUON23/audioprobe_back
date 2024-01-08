import { user as _user } from '../config/connection';
const User = _user;

export default (req, res, next) => {
    User.findByPk(req.userId).then(user => {
          if (user) {
            next();
            return;
          }
        res.status(403).send({
          message: "Require Admin authorization!"
        });
        return;
    });
  };