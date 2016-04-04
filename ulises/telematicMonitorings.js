var tmCtl = require('./telematicMonitoringsCtl');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
module.exports = router;
router.use(bodyParser.json());


//          GET
router.get('/loadInitialData', (req,res) => tmCtl.loadInitialData(req,res));
router.get('/', (req,res) => tmCtl.getTMs(req,res));
router.get('/:province(\\w+)/', (req,res) => tmCtl.getTMsByProvince(req,res));
router.get('/:year(\\d+)/', (req,res) => tmCtl.getTMsByYear(req,res));
router.get('/:province/:year', (req,res) => tmCtl.getTM(req,res));
//          POST
router.post('/', (req,res) => tmCtl.postTM(req,res));
router.post('/:province', (req,res) => tmCtl.postTMByProvince(req,res));
router.post('/:province/:year', (req,res) => tmCtl.postTMByProvince(req,res));
//          PUT
router.put('/', (req,res) => tmCtl.putToTMs(req,res));
router.put('/:province', (req,res) => tmCtl.putToTMs(req,res));
router.put('/:province/:year', (req,res) => tmCtl.putTMByProvinceYear(req,res));
//          DELETE
router.delete('/', (req,res) => tmCtl.deleteTMs(req,res));
router.delete('/:province/:year', (req,res) => tmCtl.deleteTM(req,res));
