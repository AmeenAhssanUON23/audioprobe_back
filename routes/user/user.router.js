var express = require('express');
var router = express.Router();
const validate = require('../../utils/validator'); 
const controller = require('../user/user.controller');
const {uploadFile} = require("../../middleware/upload");



// // POST: [ SIGNUP USER ] -->
// router.post('/auth/sign_up',validate('register'),controller.checkDuplicateUsernameOrEmail, controller.SignUp );

// // POST: [ SIGNIN USER ] -->
// router.post('/auth/sign_in',validate('login'), controller.SignIn);

// // GET: [ FETCH ALL USERS ] -->
// router.get('/list_of_users', isAdmin,controller.getAllUsers);

// // GET: [ GET USER WITH ID ] -->
// router.get('/users/get_user/:id', controller.getUserWithId);

// // POST: [ UPDATE USER DATA ] -->
// router.post('/users/update_users',isAdmin, controller.updateUser);

// // GET: [ SIGNOUT USER ] -->
// router.get('/auth/log_out', controller.logOut);

// GET: [ DELETE USER WITH ID ] -->
router.post('/audio/test_audio',uploadFile.single("audio"), controller.testAudio);




module.exports= router;