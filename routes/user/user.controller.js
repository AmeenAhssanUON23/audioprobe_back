const db = require('../../config/connection');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const cache = require('../../utils/cache');
const jwtConfig = require('../../config/jwt');
const jwt = require('../../utils/jwt');
const { Op } = require("sequelize");
const pg = require('../../utils/pagination');
const { exec } = require('child_process');
const { extname } = require('path');
const User = db.user;
const Role  = db.role;


// [role 1: Admin ,role 2: Therapist ]
const SignUp = async (req, res) => {
    // Save User to Database
    try {
        await User.create({
            username: req.body.username,
            fullname: req.body.fullname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            mobile: req.body.mobile,
            roleId:req.body.roleId
          });
        res.status(200).send({ response: "success", message: "User was registered successfully!" });
    } catch (error) {
        res.status(500).send({ response: "failed", message: err.message });
    }
}

  
const SignIn = async (req, res) => {
    await User.findOne({
      where: {
        username: req.body.username,
      }
    })
      .then(async user => {
        if (!user) {
          return res.status(404).send({
            response: "failed",
            message: "Invalid UserName or Password!"
          });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            response: "failed",
            message: "Invalid UserName or Password!"
          });
        }
        const token = jwt.createToken({ id: user.id, username: user.username });
        Role.findOne({
            where:{
                id:user.roleId
            }
        }).then(role =>{
          res.status(200).send({
            response: "success"
            , message: "user logged in successfully..",
            id:user.id,
            roleId: role.id,
            role: role.name,
            access_token: token,
            expires_in: jwtConfig.ttl
          });
        });
      })
      .catch(err => {
        res.status(500).send({ response: "failed", message: err.message });
      });
  };


 
const checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username ---
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          response: "failed",
          message: "User name already exist!"
        });
        return;
      }
      // Email ---
      User.findOne({
        where: {
          email: req.body.email,
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            response: "failed",
            message: "Email is already in use!"
          });
          return;
        }
        next();
      });
    });
  };
  
  const getAllUsers = async (req, res) => {
    const { page, size, title } = req.query;
    const { limit, offset } = pg.getPagination(page, size);
    await User.findAndCountAll({
      attributes: {
        exclude: ['password', 'token', 'email', 'mobile']
      }, where: null, limit, offset
    })
      .then(data => {
        const response = pg.getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.send({
          response: "failed"
          , message: err.message
        })
      })
  }
  
  const getUsersList = async (req, res) => {
    const { page, size, title } = req.query;
    const { limit, offset } = pg.getPagination(page, size);
    await User.findAndCountAll({
      attributes: {
       
        exclude: ['password', 'token', 'email', 'mobile']
      }, include: [{
        model: Role,
        attributes: [],
        where: {
          id: req.params.id
        }
      }], where: null, limit, offset
    })
      .then(data => {
        const response = pg.getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.send({
          response: "failed"
          , message: err.message
        })
      })
    }
  const getSubAdminList = async (req, res) => {
    await User.findAll({
      include: [{
        model: Role,
        attributes: [],
        where: {
          id: 2
        }
      }]
    }).then((result) => {
      res.send({
        response: 'success',
        data: result
      })
    }).catch(err => {
      res.send({
        response: "failed"
        ,message: err.message
      })
    })
  }
  
  
  const updateUser = async (req, res) => {
    try {
      const options = {
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
      }
      if(req.body.password){
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        options.password = hashedPassword
      }
      const result = await User.update( options ,
        {
          where: { id: req.body.id }
        }
      )
      res.send({
        response: "success"
        , message: "user data updated successfully.."
      });
    } catch (error) {
      res.send({
        response: "failed"
        , message: error.message
      });
    }
    
  }
  
  const logOut = async (req, res) => {
    const token = req.token;
    const now = new Date();
    const expire = new Date(req.user.exp);
    const milliseconds = now.getTime() - expire.getTime();
    /* -- BlackList Token -- */
    await cache.set(token, token, milliseconds);
    return res.send({ response: "success", message: 'Logged out successfully' });
  }
  
  const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles[i]
          });
          return;
        }
      }
    }
    next();
  };
  
  const deleteUser = async (req, res) => {
    await User.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => {
      res.send({
        response: "success"
        , message: "user deleted successfully.."
      })
    }).catch(err => {
      console.log(err)
      res.send({
        response: "failed"
        , message: err.message
      });
    })
  }
  
  const getUserWithId = async (req, res) => {
    await User.findOne({
      where: {
        id: req.params.id
      }
    }).then((result) => {
      res.send({
        response: "success"
        , data: result
      })
    }).catch(err => {
      console.log(err)
      res.send({
        response: "failed"
        , message: err.message
      });
    })
  }
  
  
  module.exports = {
    SignUp,
    SignIn,
    getAllUsers,
    getUsersList,
    getSubAdminList,
    deleteUser,
    updateUser,
    getUserWithId,
    logOut, checkRolesExisted, checkDuplicateUsernameOrEmail
  }