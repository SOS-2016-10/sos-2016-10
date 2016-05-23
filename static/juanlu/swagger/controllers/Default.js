'use strict';

var url = require('url');


var Default = require('./DefaultService');


module.exports.addDivorceSpanish = function addDivorceSpanish (req, res, next) {
  Default.addDivorceSpanish(req.swagger.params, res, next);
};

module.exports.deleteDivorceSpanishYear = function deleteDivorceSpanishYear (req, res, next) {
  Default.deleteDivorceSpanishYear(req.swagger.params, res, next);
};

module.exports.findDivorceSpanishByYear = function findDivorceSpanishByYear (req, res, next) {
  Default.findDivorceSpanishByYear(req.swagger.params, res, next);
};

module.exports.findDivorcesSpanish = function findDivorcesSpanish (req, res, next) {
  Default.findDivorcesSpanish(req.swagger.params, res, next);
};
