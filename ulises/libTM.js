var lib = require('./libTM.js')
var crypto = require('crypto');



exports.filterBy = (array, atr, val) =>{
  return array.filter((element)=>{
    return element[atr] == val; //element.atr no coge el elemento
  });
};

function nrKeys(a) {
    var i = 0;
    for (key in a) {
        i++;
    }
    return i;
}

exports.compareAssociativeArrays = (a, b) =>{
   if (a == b) {
       return true;
   }
   if (nrKeys(a) != nrKeys(b)) {
       return false;
   }
   for (key in a) {
     if (a[key] != b[key]) {
         return false;
     }
   }
   return true;
}

exports.indexOf = (array1, atr1, value1, atr2, value2) =>{
  for(var i = 0;i<array1.length;i++){
    if(array1[i][atr1] == value1 && array1[i][atr2] == value2){
      return i;
    }
  }
  return -1;
}

exports.filterFromToByProvince = (array, province, since, to)=>{
  var subArray1 = lib.filterBy(array, 'province', province);
  var subArray2 = [];
  for(i in subArray1){
    if(subArray1[i]['year']>=since && subArray1[i]['year']<=to){
      subArray2.push(subArray1[i]);
    }
  }
  return subArray2;
}

exports.filterFromToByYear = (array, year, since, to)=>{
  var subArray1 = lib.filterBy(array, 'year', year);
  var subArray2 = [];
  for(i in subArray1){
    if(subArray1[i]['year']>=since && subArray1[i]['year']<=to){
      subArray2.push(subArray1[i]);
    }
  }
  return subArray2;
}

exports.filterFromTo = (array, since, to)=>{
  var subArray = [];
  for(i in array){
    if(array[i]['year']>=since && array[i]['year']<=to){
      subArray.push(array[i]);
    }
  }
  return subArray;
}

exports.whichCase = (req)=>{
  var since = req.query.from;
  var to = req.query.to;
  var limit = req.query.limit;
  var offset = req.query.offset;
  if(since == undefined &&
      to == undefined &&
      limit == undefined &&
      offset == undefined){return 1;} //DO NOT SEARCH, DO NOT PAGINATION
  if(since != undefined &&
      to != undefined &&
      limit == undefined &&
      offset == undefined){return 2;}//DO SEARCH, DO NOT PAGINATION
  if(since == undefined &&
      to == undefined &&
      limit != undefined &&
      offset != undefined){return 3;}//DO NOT SEARCH, DO PAGINATION
      if(since != undefined &&
          to != undefined &&
          limit != undefined &&
          offset != undefined){return 4;}//DO SEARCH, DO PAGINATION
  return 0;//OTHER CASE, BAD REQUEST.
}

var pass = 'pass'
var generalPass = crypto.createHash('sha1').update(pass).digest('hex');
exports.verifyAccess = (key) =>{
  if(key == undefined){return false;}
  var keyShadow = crypto.createHash('sha1').update(key).digest('hex');
  return keyShadow == generalPass;
}

exports.isDataCorrect = (req, type) =>{
  var tm = req.body[0];
  console.log(tm)
  var province = req.params.province;
  var year = req.params.year;
  var number = Object.keys(tm).length;
  console.log(number)
  if(type == 'post'){
    if(tm['province'] == undefined || tm['year'] == undefined ||
        tm['installed'] == undefined || tm['uninstalled'] == undefined ||
        tm['actived'] == undefined || number != 5){ return false;}
  }else{
    if(tm['province'] != province || tm['year'] != year ||
        tm['installed'] == undefined || tm['uninstalled'] == undefined ||
        tm['actived'] == undefined || number != 5){ return false;}
  }
  return true;
}
