var express = require('express');
var router = express.Router();
const controller = require('./version.controller');


// GET: [ FETCH VERSION DATA ] -->
router.get('/getVersion',controller.getversion);

// POST: [ UPDATE VERSION ] -->
router.post('/update_versionData', controller.updateversion);


module.exports= router;