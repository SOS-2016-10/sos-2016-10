'use strict';

exports.addDivorceSpanish = function(args, res, next) {
  /**
   * parameters expected in the args:
  * divorceSpanish (NewDivorceSpanish)
  **/
  
  
  var examples = {};
  examples['application/json'] = {
  "age_25_29" : 123456789,
  "year" : 123456789,
  "age_0_18" : 123456789,
  "age_30_34" : 123456789,
  "autonomous_community" : "aeiou",
  "age_19_24" : 123456789
};
  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}

exports.deleteDivorceSpanishYear = function(args, res, next) {
  /**
   * parameters expected in the args:
  * year (Long)
  **/
  // no response value expected for this operation
  
  
  res.end();
}

exports.findDivorceSpanishByYear = function(args, res, next) {
  /**
   * parameters expected in the args:
  * year (Long)
  **/
  
  
  var examples = {};
  examples['application/json'] = {
  "age_25_29" : 123456789,
  "year" : 123456789,
  "age_0_18" : 123456789,
  "age_30_34" : 123456789,
  "autonomous_community" : "aeiou",
  "age_19_24" : 123456789
};
  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}

exports.findDivorcesSpanish = function(args, res, next) {
  /**
   * parameters expected in the args:
  * autonomousCommunity (String)
  * year (Long)
  * limit (Long)
  * offset (Long)
  **/
  
  
  var examples = {};
  examples['application/json'] = [ {
  "age_25_29" : 123456789,
  "year" : 123456789,
  "age_0_18" : 123456789,
  "age_30_34" : 123456789,
  "autonomous_community" : "aeiou",
  "age_19_24" : 123456789
} ];
  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}

