///    API V1  MORTAL VICTIMS

var Victims = []; //Array to initialize victims

module.exports.getVictims = (req, res) => {
  var key = req.query.apikey;
  if(checkApiKey(key)){
    var limit = req.query.limit;
    var offset = req.query.offset;
    var frm = req.query.from;
    var to = req.query.to;
    var year = req.query.year;
    var u18 = req.query.under18age;
    var f18t40 = req.query.from18to40age;
    var o40 = req.query.over40age;
    var dat = [0,0,0,0,0,0,0,0];
    var VictimsSec = [];
    var VictimsSec2 = [];
    var VictimsSec3 = [];

    if(limit){
      dat[0] = limit;
    }
    if(offset){
      dat[1] = offset;
    }
    if(frm){
      dat[2] = frm;
    }
    if(to){
      dat[3] = to;
    }
    if(year){
      dat[4] = year;
    }
    if(u18){
      dat[5] = u18;
    }
    if(f18t40){
      dat[6] = f18t40;
    }
    if(o40){
      dat[7] = o40;
    }

    VictimsSec = searchs(dat,Victims);
    VictimsSec2 = pagination(dat,VictimsSec);
    if(VictimsSec2 == 400){
      res.sendStatus(VictimsSec2);
    }else{
      VictimsSec3 = field(dat,VictimsSec2);
      res.send(VictimsSec3);
    }
  }else{
    res.sendStatus(401);
  }
}

module.exports.postVictims = (req, res) => {
  var key = req.query.apikey;
  if(checkApiKey(key)){
    var victimb = req.body;
    if(checkJSON(victimb)){
      var aux = 0;
      for(var i = 0; i < Victims.length; i++){
        if(Victims[i].autonomous_community == victimb.autonomous_community && Victims[i].year == victimb.year){
          aux++;
          break;
        }
      }
      if(aux > 0){
        res.sendStatus(409);
      }else{
        Victims.push(victim);
        res.sendStatus(201);
      }
    }else{
      res.sendStatus(400);
    }
  }else{
    res.sendStatus(401);
  }
}

module.exports.putVictims = (req, res) => {
  var key = req.query.apikey;
  if(checkApiKey(key)){
    res.sendStatus(405);
  }else{
    res.sendStatus(401);
  }
}

module.exports.deleteVictims = (req, res) => {
  var key = req.query.apikey;
  if(checkApiKey(key)){
    Victims = [];
    res.sendStatus(200);
  }else{
    res.sendStatus(401);
  }
}


module.exports.getVictim = (req, res) => {
  var key = req.query.apikey;
  if(checkApiKey(key)){
    var dat = req.params.dat;
    // CARGA DE DATOS INICIAL
    if(dat == "loadInitialData"){
      Victims = [{"autonomous_community": "Andalucia", "year": 2015, "under18age": 0, "from18to40age": 3, "over40age": 7},
                {"autonomous_community": "Madrid", "year": 2013, "under18age": 0, "from18to40age": 5, "over40age": 4},
                {"autonomous_community": "Cantabria", "year": 2013, "under18age": 0, "from18to40age": 1, "over40age": 0},
                {"autonomous_community": "Murcia", "year": 2010, "under18age": 1, "from18to40age": 0, "over40age": 2},
                {"autonomous_community": "Asturias", "year": 2011, "under18age": 0, "from18to40age": 4, "over40age": 2},
                {"autonomous_community": "Aragon", "year": 2012, "under18age": 0, "from18to40age": 3, "over40age": 7},
                {"autonomous_community": "Galicia", "year": 2013, "under18age": 0, "from18to40age": 5, "over40age": 4},
                {"autonomous_community": "Galicia", "year": 2014, "under18age": 0, "from18to40age": 0, "over40age": 2},
                {"autonomous_community": "Extremadura", "year": 2012, "under18age": 0, "from18to40age": 2, "over40age": 0},
                {"autonomous_community": "Valencia", "year": 2014, "under18age": 1, "from18to40age": 8, "over40age": 2}
              ];
      res.sendStatus(201);
    }else{
      var code = 404;
      var VictimsSec = [];
      // BUSQUEDA EN /dato/
      for(var i = 0; i < Victims.length; i++){
        if(Victims[i].autonomous_community == dat || Victims[i].year == dat || Victims[i].under18age == dat || Victims[i].from18to40age == dat || Victims[i].over40age == dat){
          VictimsSec.push(Victims[i]);
        }
      }

      if(VictimsSec.length == 0){
        res.sendStatus(code);
      }else{
        var limit = req.query.limit;
        var offset = req.query.offset;
        var frm = req.query.from;
        var to = req.query.to;
        var year = req.query.year;
        var u18 = req.query.under18age;
        var f18t40 = req.query.from18to40age;
        var o40 = req.query.over40age;
        var data = [0,0,0,0,0,0,0,0];
        var VictimsSec1 = [];
        var VictimsSec2 = [];
        var VictimsSec3 = [];

        if(limit){
          data[0] = limit;
        }
        if(offset){
          data[1] = offset;
        }
        if(frm){
          data[2] = frm;
        }
        if(to){
          data[3] = to;
        }
        if(year){
          data[4] = year;
        }
        if(u18){
          data[5] = u18;
        }
        if(f18t40){
          data[6] = f18t40;
        }
        if(o40){
          data[7] = o40;
        }

        VictimsSec1 = searchs(data,VictimsSec);
        VictimsSec2 = pagination(data,VictimsSec1);
        if(VictimsSec2 == 400){
          res.sendStatus(VictimsSec2);
        }else{
          VictimsSec3 = field(data,VictimsSec2);
          res.send(VictimsSec3);
        }
      }
    }
  }else{
    res.sendStatus(401);
  }
}

module.exports.getVictimYear = (req, res) => {
  var key = req.query.apikey;
  if(checkApiKey(key)){
    var ac = req.params.autonomous_community;
    var year = req.params.year;
    var VictimsSec = [];
    for(var i = 0; i < Victims.length; i++){
      if(Victims[i].autonomous_community == ac && Victims[i].year == year){
        VictimsSec.push(Victims[i]);
      }
    }
    res.send(VictimsSec);
  }else{
    res.sendStatus(401);
  }
}

module.exports.postVictim = (req, res) => {
  var key = req.query.apikey;
  if(checkApiKey(key)){
    res.sendStatus(405);
  }else{
    res.sendStatus(401);
  }
}
// update victim, or create if it doest exist
module.exports.putVictim = (req, res) => {
  var key = req.query.apikey;
  if(compruebaApiKey(key)){
    var victimb = req.body;
    if(compruebaJSON(victimb)){
      var victim = req.params.autonomous_community;
      var code = 400;
      if(victim != victimb.autonomous_community){
        res.sendStatus(code);
      }else{
        var aux = 0;
        for(var i = 0; i < Victims.length; i++){
          if(Victims[i].autonomous_community == victim){
            aux++;
          }
        }
        if(aux > 1){
          code = 409;
        }else if(aux == 0){
          code = 404;
        }else{
          for(var i = 0; i < Victims.length; i++){
            if(Victims[i].autonomous_community == victim){
              Victims.splice(i, 1);
              Victims.push(victimb);
              code = 200;
              break;
            }
          }
        }
        res.sendStatus(code);
      }
    }else{
      res.sendStatus(400);
    }
  }else{
    res.sendStatus(401);
  }
}
//update victim by a certain parameter, create victim if it doesnt exist
module.exports.putVictimDat = (req, res) => {
  var key = req.query.apikey;
  if(checkApiKey(key)){
    var victimb = req.body;
    if(checkJSON(victimb)){
      var ac = req.params.autonomous_community;
      var dat = req.params.dat;
      var VictimsSec = [];
      for(var i = 0; i < Victims.length; i++){
        if(Victims[i].autonomous_community == ac && (Victims[i].year == dat || Basins[i].under18age == dat || Basins[i].from18to40age == dat || Basins[i].over40age == dat)){
          VictimsSec.push(Victims[i]);
        }
      }
      if(VictimsSec.length > 1){
        res.sendStatus(400);
      }else{
        for(var i = 0; i < Victims.length; i++){
          if(Victims[i].autonomous_community == ac && (Victims[i].year == dat || Victims[i].under18age == dat || Victims[i].from18to40age == dat || Victims[i].over40age == dat)){
            Victims.splice(i, 1);
            Victims.push(victimb);
            break;
          }
        }
        res.sendStatus(200);
      }
    }else{
      res.sendStatus(400);
    }
  }else{
    res.sendStatus(401);
  }
}
//victim deletion. Delete all the victims in one Autonomous community
module.exports.deleteVictim = (req, res) => {
  var key = req.query.apikey;
  if(checkApiKey(key)){
    var ac = req.params.autonomous_community;
    var code = 404;
    for(var i = 0; i < Victims.length; i++){
      if(Victims[i].autonomous_community == ac){
        Victims.splice(i, 1);
        code = 200;
      }
    }
    res.sendStatus(code);
  }else{
    res.sendStatus(401);
  }
}

function searchs(data,VictimsSec){

  var VictimsSec1 = [];
  var VictimsSec2 = [];

  if(data[2] || data[3] || data[4] || data[5] || data[6] || data[7]){
    // from and to YEAR, searchs
    if(data[2]){
      if(data[3]){
        for (var i = 0; i < VictimsSec.length; i++){
          if (VictimsSec[i].year >= data[2] && VictimsSec[i].year <= data[3]){
            VictimsSec1.push(VictimsSec[i]);
          }
        }
      }else{
        for (var i = 0; i < VictimsSec.length; i++){
          if (VictimsSec[i].year >= data[2]){
            VictimsSec1.push(VictimsSec[i]);
          }
        }
      }
    }
    else if(data[3]){
      for (var i = 0; i < VictimsSec.length; i++){
        if (VictimsSec[i].year <= data[3]){
          VictimsSec1.push(VictimsSec[i]);
        }
      }
    }else{
      VictimsSec1 = VictimsSec;
    }

    // filtering YEAR, <18 , 18-40 , +40
    if(data[4]){
      for (var i = 0; i < VictimsSec1.length; i++){
        if (VictimsSec1[i].year == data[4]){
          VictimsSec2.push(VictimsSec1[i]);
        }
      }
    }else{
      VictimsSec2 = VictimsSec1;
    }
    if(data[5]){
      VictimsSec1 = [];
      for (var i = 0; i < VictimsSec2.length; i++){
        if (VictimsSec2[i].under18age == data[5]){
          VictimsSec1.push(VictimsSec2[i]);
        }
      }
    }else{
      VictimsSec1 = VictimsSec2;
    }
    if(data[6]){
      VictimsSec2 = [];
      for (var i = 0; i < VictimsSec1.length; i++){
        if (VictimsSec1[i].from18to40age == data[6]){
          VictimsSec2.push(VictimsSec1[i]);
        }
      }
    }else{
      VictimsSec2 = VictimsSec1;
    }
    if(data[7]){
      VictimsSec1 = [];
      for (var i = 0; i < VictimsSec2.length; i++){
        if (VictimsSec2[i].over40age == data[7]){
          VictimsSec1.push(VictimsSec2[i]);
        }
      }
    }else{
      VictimsSec1 = VictimsSec2;
    }

  }else{
    VictimsSec2 = VictimsSec;
  }
  return VictimsSec2;
}

// Limit and Offset treatment, pagination
function pagination(data,VictimsSec){
  var VictimsSec2 = [];
  var aux = 0;
  if(data[0] || data[1]){
      if(data[0] < 0 || data[1] > VictimsSec.length){
      VictimsSec2 = 400;
    }else if(data[0] >= 0){
      for(var i = data[1]; i < VictimsSec.length; i++){
        VictimsSec2.push(VictimsSec[i]);
        aux++;
        if(aux == data[0]){
          break;
        }
      }
    }
  }else{
    VictimsSec2 = VictimsSec;
  }
  return VictimsSec2;
}

function field(data,VictimsSec){
  var VictimsSec2 = [];
  return VictimsSec;
}
//apikey checker
function checkApiKey(key){
  var res = false;
  if(key == "requena"){
    res = true;
  }
  return res;
}
//correct format checker
function checkJSON(body){
  var res = false;
  if(body.autonomous_community && body.year && body.under18age && body.from18to40age && body.over40age){
    res = true;;
  }
  return res;
}
