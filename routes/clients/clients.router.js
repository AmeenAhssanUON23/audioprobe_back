var express = require('express');
var router = express.Router();
const controller = require('../clients/clients.controller');

// POST: [ ADD CLIENT ] -->
router.post('/clients/add_client', controller.addClients);

// GET: [ FETCH ALL CLIENTS ] -->
router.get('/clients/list_of_clients', controller.getAllClients);

// POST: [ UPDATE CLIENTS ] -->
router.post('/clients/update_client', controller.updateClients);

// GET: [ DELETE A CLIENT ] -->
router.get('/clients/delete_client/:id', controller.deleteClient);


module.exports= router;