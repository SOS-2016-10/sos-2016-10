/*app.get("/api/v1/divorces-spanish/loadInitialData", divorcesSpanishCtl.loadInitialData); //Inicializar divorces-spanish "/api/v1/divorces-spanish/loadInitialData"
app.get("/api/v1/divorces-spanish", divorcesSpanishCtl.getDivorces);
app.post("/api/v1/divorces-spanish", divorcesSpanishCtl.postDivorces);
app.put("/api/v1/divorces-spanish", divorcesSpanishCtl.putDivorces);
app.delete("/api/v1/divorces-spanish", divorcesSpanishCtl.deleteDivorces);
//OPERACIONES sobre 1 DIVORCE(recurso) ":autonomous_community"
app.get("/api/v1/divorces-spanish/:autonomous_community", divorcesSpanishCtl.getDivorce);
app.post("/api/v1/divorces-spanish/:autonomous_community", divorcesSpanishCtl.postDivorce);
app.put("/api/v1/divorces-spanish/:autonomous_community", divorcesSpanishCtl.putDivorce);
app.delete("/api/v1/divorces-spanish/:autonomous_community", divorcesSpanishCtl.deleteDivorce);
//OPERACIONES sobre 1 DIVORCE(recurso) ":year"
app.get("/api/v1/divorces-spanish/:year", divorcesSpanishCtl.getYear);
app.post("/api/v1/divorces-spanish/:year", divorcesSpanishCtl.postYear);
app.put("/api/v1/divorces-spanish/:year", divorcesSpanishCtl.putYear);
app.delete("/api/v1/divorces-spanish/:year", divorcesSpanishCtl.deleteYear);
//OPERACIONES sobre 1 DIVORCE(recurso) "/:autonomous_community/:year"
app.get("/api/v1/divorces-spanish/:autonomous_community/:year", divorcesSpanishCtl.getDivorceYear);
app.post("/api/v1/divorces-spanish/:autonomous_community/:year", divorcesSpanishCtl.postDivorceYear);
app.put("/api/v1/divorces-spanish/:autonomous_community/:year", divorcesSpanishCtl.putDivorceYear);
app.delete("/api/v1/divorces-spanish/:autonomous_community/:year", divorcesSpanishCtl.deleteDivorceYear);*/
var express = require("express");
var app = express();
var router = express.Router();
var functions = require('./functions.js'); //Importo funciones

///Array sobre el que hago las operaciones
var divorces = [];
//Para inicializar la API REST "divorces-spanish" ///////////////////////////////////////////////////////////////
// /api/v1/divorces-spanish/loadInitialData“ ////////////////////////////////////////////////////////////////////
//module.exports.loadInitialData = (req,res)=>{
router.get("/loadInitialData", (req,res)=>{
  console.log("/api/v1/divorces-spanish/loadInitialData");
  divorces.push({ autonomous_community: "canarias", year: 2014, age_0_18: 0, age_19_24: 10, age_25_29: 149, age_30_34: 429 });//No es JSON(es JavaScript)
  divorces.push({ autonomous_community: "cantabria", year: 2014, age_0_18: 0, age_19_24: 5, age_25_29: 25, age_30_34: 103 });
  divorces.push({ autonomous_community: "extremadura", year: 2014, age_0_18: 0, age_19_24: 3, age_25_29: 39, age_30_34: 180 });
  divorces.push({ autonomous_community: "galicia", year: 2014, age_0_18: 0, age_19_24: 19, age_25_29: 167, age_30_34: 492 });
  divorces.push({ autonomous_community: "ceuta", year: 2014, age_0_18: 0, age_19_24: 0, age_25_29: 10, age_30_34: 31 });
  divorces.push({ autonomous_community: "andalucia", year: 2013, age_0_18: 3, age_19_24: 77, age_25_29: 607, age_30_34: 1956 });
  divorces.push({ autonomous_community: "andalucia", year: 2014, age_0_18: 1, age_19_24: 56, age_25_29: 537, age_30_34: 1860 });
  //res.send(divorces);
  res.sendStatus(200); //OK
});

//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Funciones //////////////////////////////////////


//vistas
function field(dat,BasinsSeg){
  var BasinsSeg2 = [];
  return BasinsSeg;
}

function compruebaApiKey(key){
  var res = false;
  if(key == "sos"){
    res = true;
  }
  return res;
}

////////////////////////////////////////////////////////////////////////////////////////
//////////////////// Operaciones sobre lista de recursos ////////////////////
//module.exports.getDivorces = (req,res)=>{
router.get("/", (req,res)=>{
  var q = req.query;
  if(Object.keys(q).length == 0){ //No hay busqueda(nº parámetros = 0)
    console.log("New GET of \"divorces-spanish\"");
    res.send(divorces);
  } else { //Hay parámetros de busqueda
    var aux = functions.search(divorces,q);
    res.send(aux);
  }
});
//module.exports.postDivorces = (req,res)=>{
router.post("/", (req,res)=>{
  var divorce = req.body;

  //comprobar antes que no existe esa "autonomous_community" ya
  var e = find_resource(divorces,divorce.autonomous_community)[0];
  if(e == 0){ //No hay error(lo encuentra, ya existe)
    res.sendStatus(409); //Conflict
    console.log("NOT POST because \""+divorce.autonomous_community+"\" exist");
  } else if(divorce.length != divorces.length){
    console.log("400 BAD REQUEST");
    res.sendStatus(400);
  } else {
    divorces.push(divorce);
    console.log("New POST of resource "+divorce.autonomous_community);
    res.sendStatus(201); //CREATED
  }
});
//NO PERMITIDO
//module.exports.putDivorces = (req,res)=>{
router.put("/", (req,res)=>{
  console.log("PUT NOT ALLOWED");
  res.sendStatus(405);
});
//module.exports.deleteDivorces = (req,res)=>{
router.delete("/", (req,res)=>{
  console.log("New DELETE of \"divorces-spanish\"");
  functions.deleteAll(divorces);
  res.sendStatus(200);
});

/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////// Operaciones sobre 1 recurso (autonomous_community) ////////////////////
//module.exports.getDivorce = (req,res)=>{
router.get("/:autonomous_community", (req,res)=>{
  var n = req.params.autonomous_community;
  console.log("New GET of resource "+n);

  var ac = find_community(divorces,n)[2];
  var e = find_community(divorces,n)[0];
  //var e = find_resource(divorces,n)[0];
  //var i = find_resource(divorces,n)[1];
  if(e == 0){ //Error == 0 "NO hay error"
    //res.send(divorces[i]);
    res.send(ac);
  } else {
    res.sendStatus(404);
  }
});
//NO PERMITIDO
//module.exports.postDivorce = (req,res)=>{
router.post("/:autonomous_community", (req,res)=>{
  console.log("POST NOT ALLOWED");
  res.sendStatus(405);
});
//module.exports.putDivorce = (req,res)=>{
router.put("/:autonomous_community", (req,res)=>{
  var n = req.body.autonomous_community;

  var e = find_resource(divorces,n)[0];
  var i = find_resource(divorces,n)[1];
  if(e == 0){ //No hay error(lo encuentra, ya existe)
    divorces.splice(i, 1); //Elimino objeto
    divorces.push(req.body); //Añado objeto
    console.log("New PUT of resource "+n);
    res.sendStatus(200);
  } else {
    console.log("Resource \""+n+"\" NOT exist");
    res.sendStatus(404);
  }
});
//module.exports.deleteDivorce = (req,res)=>{
router.delete("/:autonomous_community", (req,res)=>{
  var n = req.params.autonomous_community;

  var e = find_resource(divorces,n)[0];
  var i = find_resource(divorces,n)[1];
  if(e == 0){ //Lo encuentro en "divorces"
    divorces.splice(i, 1); //delete divorces[i];
    console.log("New DELETE of resource "+n);
    res.sendStatus(200);
  } else { //No lo encuentro en "divorces"
    console.log("Not DELETE because NOT FOUND "+n);
    res.sendStatus(404);
  }
});

//OPERACIONES sobre 1 DIVORCE(recurso) ":year"////////////////////////////////////////////////////////////////7
//module.exports.getYear = (req,res)=>{
router.get("/:year", (req,res)=>{
  var y = req.params.year;
  console.log("New GET of resource "+n);

  var ay = find_year(divorces,y)[2]; // ay = arrayYears
  var e = find_year(divorces,y)[0];
  if(e == 0){ //Error == 0 "NO hay error"
    res.send(ay);
  } else {
    res.sendStatus(404);
  }
});
//module.exports.postYear = (req,res)=>{
router.post("/:year", (req,res)=>{
  console.log("POST NOT ALLOWED");
  res.sendStatus(405);
});
//module.exports.putYear = (req,res)=>{
router.put("/:year", (req,res)=>{
  var y = req.body.year;

  var e = find_year(divorces,y)[0];
  var i = find_year(divorces,y)[1];
  if(e == 0){ //No hay error(lo encuentra, ya existe)
    divorces.splice(i, 1); //Elimino objeto
    divorces.push(req.body); //Añado objeto
    console.log("New PUT of resource "+n);
    res.sendStatus(200);
  } else {
    console.log("Resource \""+n+"\" NOT exist");
    res.sendStatus(404);
  }
});
//module.exports.deleteYear = (req,res)=>{
router.delete("/:year", (req,res)=>{
  var y = req.params.year;

  var e = find_resource(divorces,y)[0];
  var i = find_resource(divorces,y)[1];
  if(e == 0){ //Lo encuentro en "divorces"
    divorces.splice(i, 1); //delete divorces[i];
    console.log("New DELETE of resource "+n);
    res.sendStatus(200);
  } else { //No lo encuentro en "divorces"
    console.log("Not DELETE because NOT FOUND "+n);
    res.sendStatus(404);
  }
});

//////////////////// Operaciones sobre 1 recurso (autonomous_community/year) ////////////////////////////////////////
//module.exports.getDivorceYear = (req,res)=>{
router.get("/:autonomous_community/:year", (req,res)=>{
  var n = req.params.autonomous_community;
  var y = req.params.year;
  console.log("New GET of resource "+n+" "+y);

  var ac = find_community(divorces,n)[2]; //obtengo arrayComunidades
  var ay = find_year(ac,y)[2]; //obtengo arrayYear de arrayComunidades
  var e = find_year(ac,y)[0];
  //var e = find_resource(divorces,y)[0];
  //var i = find_resource(divorces,n)[1];
  if(e == 0){ //Error == 0 "NO hay error"
    //res.send(divorces[i]);
    res.send(ay);
  } else {
    res.sendStatus(404);
  }
});
//NO PERMITIDO
//module.exports.postDivorceYear = (req,res)=>{
router.post("/:autonomous_community/:year", (req,res)=>{
  console.log("POST NOT ALLOWED");
  res.sendStatus(405);
});
//module.exports.putDivorceYear = (req,res)=>{
router.put("/:autonomous_community/:year", (req,res)=>{
  //var n = req.body.year;

  var n = req.body.autonomous_community;
  var y = req.body.year;
  var ac = find_community(divorces,n)[2]; //obtengo arrayComunidades
  var ay = find_year(ac,y)[2]; //obtengo arrayYear de arrayComunidades
  var e = find_year(ac,y)[0];
  //var e = find_resource(divorces,n)[0];
  //var i = find_resource(divorces,n)[1];
  if(e == 0){ //No hay error(lo encuentra, ya existe)
    divorces.splice(i, 1); //Elimino objeto
    divorces.push(req.body); //Añado objeto
    console.log("New PUT of resource "+n+" "+y);
    res.sendStatus(200);
  } else {
    console.log("Resource \""+n+" "+y+"\" NOT exist");
    res.sendStatus(404);
  }
});
//module.exports.deleteDivorceYear = (req,res)=>{
router.delete("/:autonomous_community/:year", (req,res)=>{
  var n = req.params.autonomous_community;
  var y = req.params.year;
  var ac = find_community(divorces,n)[2]; //obtengo arrayComunidades
  var ay = find_year(ac,y)[2]; //obtengo arrayYear de arrayComunidades
  var e = find_year(ac,y)[0];

  //var e = find_resource(divorces,n)[0];
  //var i = find_resource(divorces,n)[1];
  if(e == 0){ //Lo encuentro en "divorces"
    divorces.splice(i, 1); //delete divorces[i];
    console.log("New DELETE of resource "+n);
    res.sendStatus(200);
  } else { //No lo encuentro en "divorces"
    console.log("Not DELETE because NOT FOUND "+n+" "+y);
    res.sendStatus(404);
  }
});



module.exports = router;
