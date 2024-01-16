var express = require('express');
var router = express.Router();
const validate = require('../../utils/validator'); 
const controller = require('../user/user.controller');
const isAdmin = require("../../middleware/isadmin");
const {uploadFile} = require("../../middleware/upload");



// POST: [ SIGNUP USER ] -->
router.post('/auth/sign_up',validate('register'),controller.checkDuplicateUsernameOrEmail,controller.checkRolesExisted, controller.SignUp);

// POST: [ SIGNIN USER ] -->
router.post('/auth/sign_in',validate('login'), controller.SignIn);

// GET: [ FETCH ALL USERS ] -->
router.get('/users',controller.getAllUsers);

// POST: [ UPDATE USER DATA ] -->
router.post('/users/update_users', controller.updateUser);

// GET: [ SIGNOUT USER ] -->
router.get('/auth/log_out', controller.logOut);

// GET: [ DELETE USER WITH ID ] -->
router.get('/users/delete_user/:id', controller.deleteUser);


module.exports= router;