var express = require('express');
var router = express.Router();
const controller = require('./availability.controller');

// POST: [ ADD AVAILABILTY ] -->
router.post('/availability/add_availability', controller.addAvailability);

// GET: [ FETCH ALL AVAILABILTY ] -->
router.get('/availability/list_of_availability', controller.getAllAvailability);

// POST: [ UPDATE AVAILABILTY ] -->
router.post('/availability/update_availability', controller.updateAvailability);

// GET: [ DELETE AN AVAILABILTY ] -->
router.get('/availability/delete_availability/:id', controller.deleteAvailability);


module.exports= router;