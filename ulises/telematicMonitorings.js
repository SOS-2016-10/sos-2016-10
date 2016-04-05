var tmCtl = require('./telematicMonitoringsCtl');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var passport = require('passport');
module.exports = router;
router.use(bodyParser.json());
router.use(passport.initialize());


//          GET
router.get('/loadInitialData',  tmCtl.WriteAccess, (req,res) => tmCtl.loadInitialData(req,res));
router.get('/',                 tmCtl.ReadAccess, (req,res) => tmCtl.getTMs(req,res));
router.get('/:province(\\w+)/', tmCtl.ReadAccess,(req,res) => tmCtl.getTMsByProvince(req,res));
router.get('/:year(\\d+)/',     tmCtl.ReadAccess, (req,res) => tmCtl.getTMsByYear(req,res));
router.get('/:province/:year',  tmCtl.ReadAccess, (req,res) => tmCtl.getTM(req,res));
//          POST
router.post('/',                tmCtl.WriteAccess,(req,res) => tmCtl.postTM(req,res));
router.post('/:province',       tmCtl.WriteAccess, (req,res) => tmCtl.postTMByProvince(req,res));
router.post('/:province/:year', tmCtl.WriteAccess, (req,res) => tmCtl.postTMByProvince(req,res));
//          PUT
router.put('/',                 tmCtl.WriteAccess, (req,res) => tmCtl.putToTMs(req,res));
router.put('/:province',        tmCtl.WriteAccess, (req,res) => tmCtl.putToTMs(req,res));
router.put('/:province/:year',  tmCtl.WriteAccess, (req,res) => tmCtl.putTMByProvinceYear(req,res));
//          DELETE
router.delete('/',              tmCtl.WriteAccess, (req,res) => tmCtl.deleteTMs(req,res));
router.delete('/:province/:year',tmCtl.WriteAccess, (req,res) => tmCtl.deleteTM(req,res));
