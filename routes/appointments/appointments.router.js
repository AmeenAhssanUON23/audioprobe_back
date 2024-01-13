var express = require('express');
var router = express.Router();
const controller = require('./appointments.controller');

// POST: [ ADD APPOINTMENTS ] -->
router.post('/appointments/add_appointments', controller.addAppointments);

// GET: [ FETCH ALL APPOINTMENTS ] -->
router.get('/appointments/list_of_appointments', controller.getAllAppointments);

// POST: [ UPDATE APPOINTMENTS ] -->
router.post('/appointments/update_appointments', controller.updateAppointments);

// GET: [ DELETE A APPOINTMENTS ] -->
router.get('/appointments/delete_appointments/:id', controller.deleteAppointments);


module.exports= router;