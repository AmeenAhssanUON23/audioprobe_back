const { Sequelize } = require('../../config/connection');
const db = require('../../config/connection');
const pg = require('../../utils/pagination');
const User = db.user;
const staff = db.staff;
const cache = require('../../utils/cache');
const jwtConfig = require('../../config/jwt');
const jwt = require('../../utils/jwt');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');



const staffSignUp = async (req, res) => {
    // Save Staff assigned to a user to Database
    try {
        await staff.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            userId:req.body.userId
          });
        res.status(200).send({ response: "success", message: "Staff registered successfully!" });
    } catch (error) {
        res.status(500).send({ response: "failed", message: error.message });
    }
}

  
const staffSignIn = async (req, res) => {
    await staff.findOne({
      where: {
        username: req.body.username
      }
    }).then(async staff => {
        if (!staff) {
          return res.status(404).send({
            response: "failed",
            message: "Invalid UserName or Password!"
          });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          staff.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            response: "failed",
            message: "Invalid UserName or Password!"
          });
        }
        const token = jwt.createToken({ id: staff.id, username: staff.username });
        User.findOne({
            where:{
                id:staff.userId
            }
        }).then(user =>{
          res.status(200).send({
            response: "success"
            , message: "logged in successfully..",
            id:staff.id,
            // name:staff.fullname,
            therapistId: user.id,
            therapist: user.fullname,
            access_token: token,
            expires_in: jwtConfig.ttl
          });
        });
      })
      .catch(err => {
        res.status(500).send({ response: "failed", message: err.message });
      });
  };


 

module.exports = {
   staffSignUp,
   staffSignIn
};