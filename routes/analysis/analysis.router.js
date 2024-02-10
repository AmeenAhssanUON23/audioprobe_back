var express = require('express');
var router = express.Router();
const controller = require('./analysis.controller');
const {uploadFile} = require("../../middleware/upload");


// POST: [ ADD ANALYSIS ] -->
router.post('/analysis/add_analysis', controller.addAnalysis);

// GET: [ FETCH ALL ANALYSIS WITH CLIENT FILTER ] -->
router.get('/analysis/list_of_analysis', controller.getAllanalysis);

// GET: [ DELETE AN ANALYSIS ] -->
router.get('/analysis/delete_analysis/:id', controller.deleteAnalysis);

// GET: [ ADD AN AUDIO FOR PRAAT ANALYSIS ] -->
router.post('/audio/get_analysis',uploadFile.single("audio"), controller.getAudioAnalysis);

module.exports = router;