// URI:/api/v1/telematic-monitorings
var fs = require('fs');
var lib = require('./libTM.js');




var tms = [];//[{province:"Sevilla",year:2013,installed:22,uninstalled:23,actived:27}];
//////////////////////////////      GET       //////////////////////////////////
exports.loadInitialData = (req,res)=>{
  if(!lib.verifyAccess(req.query.apikey)){ return res.sendStatus(401);}
  tms = JSON.parse(fs.readFileSync('./ulises/tm_initial_data.json','utf8'));
  res.sendStatus(200);
};

//search & pagination implemented
exports.getTMs = (req,res)=>{
  console.log("New GET of TMs.");
  if(!lib.verifyAccess(req.query.apikey)){ return res.sendStatus(401);}
  switch (lib.whichCase(req)) {
    case 0://Bad request.
      return res.sendStatus(400);
    case 1://DO NOT SEARCH, DO NOT PAGINATION
      var subArray = tms;
      break;
    case 2://SEARCH, DO NOT PAGINATION
    console.log('cASE 2: ')
      var subArray = lib.filterFromTo(tms, req.query.from, req.query.to);
      break;
    case 3://DO NOT SEARCH, PAGINATION
      var subArray = tms;
      var limit = parseInt(req.query.limit);
      var offset = parseInt(req.query.offset);
      subArray = subArray.slice(offset, (offset+limit));
      break;
    case 4://SEARCH, PAGINATION
      var limit = parseInt(req.query.limit);
      var offset = parseInt(req.query.offset);
      console.log('offset: '+req.query.limit)
      console.log('limit: '+limit)
      var subArray = lib.filterFromTo(tms, req.query.from, req.query.to);
      console.log(subArray);
      console.log('offset+limit: '+(offset+limit))
      subArray = subArray.slice(offset, (offset+limit));//PAGINATION
      console.log('SUB')
      console.log(subArray)
      break;
  }
  (subArray.length == 0) ? res.sendStatus(404) : res.send(subArray);
};

//search & pagination implemented
exports.getTMsByProvince = (req, res) => {// '/:province(\\D+)/ replaced for '/:province(\\w+)/
    if(!lib.verifyAccess(req.query.apikey)){ return res.sendStatus(401);}
    var value = req.params.province;
    switch (lib.whichCase(req)) {
      case 0://Bad request.
        return res.sendStatus(400);
      case 1://DO NOT SEARCH, DO NOT PAGINATION
        var subArray = lib.filterBy(tms, 'province', value);
        break;
      case 2://DO SEARCH, DO NOT PAGINATION
        var subArray = lib.filterFromToByProvince(tms, value, req.query.from, req.query.to);
        break;
      case 3://DO NOT SEARCH, DO PAGINATION
        var subArray = lib.filterBy(tms, 'province', value);
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        res.send(subArray.slice(offset, offset+limit));
        break;
      case 4://DO SEARCH, DO PAGINATION
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var subArray = lib.filterFromToByProvince(tms, value, req.query.from, req.query.to);
        subArray.slice(offset, offset+limit);//PAGINATION
        break;
    }
    console.log("New GET by Province: "+value);
    (subArray.length == 0) ? res.sendStatus(404) : res.send(subArray);
}

//search & pagination implemented
exports.getTMsByYear = (req, res) => {
    if(!lib.verifyAccess(req.query.apikey)){ return res.sendStatus(401);}
    var value = req.params.year;
    switch (lib.whichCase(req)) {
      case 0://Bad request.
        return res.sendStatus(400);
      case 1://DO NOT SEARCH, DO NOT PAGINATION
        var subArray = lib.filterBy(tms, 'year', value);
        break;
      case 2://DO SEARCH, DO NOT PAGINATION
        var subArray = lib.filterFromToByYear(tms, value, req.query.from, req.query.to);
        break;
      case 3://DO NOT SEARCH, DO PAGINATION
        var subArray = lib.filterBy(tms, 'year', value);
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        res.send(subArray.slice(offset, offset+limit));
        break;
      case 4://DO SEARCH, DO PAGINATION
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var subArray = lib.filterFromToByYear(tms, value, req.query.from, req.query.to);
        subArray.slice(offset, offset+limit);//PAGINATION
        break;
    }
    console.log("New GET by year: "+value);
    (subArray.length == 0) ? res.sendStatus(404) : res.send(subArray);
};

//only one element can exits, so it is NOT necessary PAGINATION or SEARCH.
exports.getTM = (req,res)=>{
  if(!lib.verifyAccess(req.query.apikey)){ return res.sendStatus(401);}
  var value1 = req.params.province;
  var value2 = req.params.year;
  console.log("New get of /"+value1+'/'+value2);
  subArray1 = lib.filterBy(tms,'province', value1);
  if(subArray1.length == 0){
    res.sendStatus(404);
  }else{
    subArray2 = lib.filterBy(subArray1, 'year', value2);
    (subArray2.length == 0) ? res.sendStatus(404) : res.send(subArray2);
  }
};

/////////////////////////////////    POST     //////////////////////////////////
/*
router.post('/',(req,res)=>{
  var tm = req.body;
  for(var i=0;i<tms.length;i++){
    if(lib.compareAssociativeArrays(tms[i], tm[0])){
      res.sendStatus(409);//Equal elements, error
      break;
    }
    if(i==tms.length-1){//Last iteration, not equal elements yet, so that add the new element
      tms.push(tm[0]);
      res.sendStatus(201);//Created.
      break;
    }
  }
  console.log("New POST of "+tm[0]["province"]);
});
*/

exports.postTM = (req,res)=>{
  if(!lib.verifyAccess(req.query.apikey)){ return res.sendStatus(401);}
  if(!lib.isDataCorrect(req,'post')){ return res.sendStatus(400);}
  var tm = req.body;
  var subArray1 = lib.filterBy(tms, 'province', tm[0]['province']);
  var subArray2 = lib.filterBy(subArray1, 'year', tm[0]['year']);
    if(subArray2.length == 0){
      tms.push(tm[0]);
      res.sendStatus(201);
    }else{
      res.sendStatus(409);
    }
  console.log("New POST of "+tm[0]["province"]);
};

exports.postTMByProvince = (req,res)=>{
  if(!lib.verifyAccess(req.query.apikey)){ return res.sendStatus(401);}
  res.sendStatus(405);
  console.log("Post not allowed.")
};
/*
exports.postTMByProvinceYear('/:province/:year', (req,res)=>{
  res.sendStatus(405);
  console.log("Post not allowed.")
};
*/

//////////////////////////////     PUT     /////////////////////////////////////
exports.putToTMs = (req,res)=>{
  if(!lib.verifyAccess(req.query.apikey)){ return res.sendStatus(401);}
  console.log("Put not allowed.");
  res.sendStatus(405);
};

/*
exports.putByProvince = (req,res)=>{
  if(!lib.verifyAccess(req.query.apikey)){ return res.sendStatus(401);}
  console.log("Put not allowed.");
  res.sendStatus(405);
};
*/

exports.putTMByProvinceYear = (req,res)=>{
  if(!lib.verifyAccess(req.query.apikey)){ return res.sendStatus(401);}
  if(!lib.isDataCorrect(req,'put')){ return res.sendStatus(400)};
  var tm = req.body[0];
  var value1 = req.params.province;
  var value2 = req.params.year;
  var index = lib.indexOf(tms, 'province', value1, 'year', value2);
  console.log("New put of "+value1,value2);
  if(index > -1){
    tms[index] = tm;
    res.sendStatus(200);
  }else{
    res.sendStatus(404);
  }
};

/////////////////////////////       DELETE     /////////////////////////////////
exports.deleteTMs = (req,res)=>{
  if(!lib.verifyAccess(req.query.apikey)){ return res.sendStatus(401);}
  console.log("Deleting TMs.");
  tms = [];
  res.sendStatus(200);
};

/*??????????????????????????????????????????????????????????????????
router.delete('/:province', (req, res)=>{

});
*/

exports.deleteTM =  (req,res)=>{
  if(!lib.verifyAccess(req.query.apikey)){ return res.sendStatus(401);}
  var value1 = req.params.province;
  var value2 = req.params.year;
  var index = lib.indexOf(tms, 'province', value1, 'year', value2);
  if(index > -1){
    tms.splice(index, 1);
    res.sendStatus(200);
  }else{
    res.sendStatus(400);
  }
};
//
//
//
