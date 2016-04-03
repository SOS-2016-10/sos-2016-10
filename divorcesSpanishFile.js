var express = require("express");
var app = express();
var router = express.Router();
var functions = require('./functions.js'); //Importo funciones
var bodyParser = require('body-parser');

router.use(bodyParser.json());

///Array sobre el que hago las operaciones
var divorces = [];

//Para inicializar la API REST "divorces-spanish" ///////////////////////////////////////////////////////////////
// /api/v1/divorces-spanish/loadInitialData“ ////////////////////////////////////////////////////////////////////
//module.exports.loadInitialData = (req,res)=>{
router.get("/loadInitialData", (req,res)=>{
  if(divorces.length == 0){ //Cargo los datos si está vacío
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
  } else {
    console.log("No charge DATA, because exist data");
    res.sendStatus(409); //Conflict
  }
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
router.post("/", (req,res)=>{
  var divorce = req.body;

  //comprobar antes que no existe esa "autonomous_community" ya y ese "year"
  var eiaux = functions.find_community(divorces,req.body.autonomous_community);//functions.find_resource(divorces,divorce.autonomous_community)[0];
  var eiaux2 = functions.find_year(divorces,req.body.year);
  if((eiaux.v1 == 0) && (eiaux2.v1 == 0)){ //No hay error(lo encuentra, ya existe)
    res.sendStatus(409); //Conflict
    console.log("NOT POST because \""+divorce.autonomous_community+"\" or \""+divorce.year+"\" exist");
  //} else if(divorce.length != 6){ //6 campos en cada objeto
    //console.log("400 BAD REQUEST");
    //res.sendStatus(400);
  } else {
    divorces.push(divorce);
    console.log("New POST of resource "+divorce.autonomous_community+" "+divorce.year);
    res.sendStatus(201); //CREATED
  }
});
//NO PERMITIDO
router.put("/", (req,res)=>{
  console.log("PUT NOT ALLOWED");
  res.sendStatus(405);
});
router.delete("/", (req,res)=>{
  console.log("New DELETE of \"divorces-spanish\"");
  functions.deleteAll(divorces);
  res.sendStatus(200);
});

/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////// Operaciones sobre 1 recurso (autonomous_community) ////////////////////
router.get("/:autonomous_community(\\D+)", (req,res)=>{ //"D+" patrón para NO dígitos(letras)
  var n = req.params.autonomous_community;
  console.log("New GET of resource "+n);

  var eiaux = functions.find_community(divorces,n);
  if(eiaux.v1 == 0){ //Error == 0 "NO hay error"
    //res.send(divorces[i]);
    res.send(eiaux.v3);
  } else {
    res.sendStatus(404);
  }
});
//NO PERMITIDO
router.post("/:autonomous_community", (req,res)=>{
  console.log("POST NOT ALLOWED");
  res.sendStatus(405);
});

router.put("/:autonomous_community", (req,res)=>{
  var n = req.body.autonomous_community;
  var y = req.body.year;

  //var e = functions.find_resource(divorces,n)[0];
  //var i = functions.find_resource(divorces,n)[1];
  var eiaux = functions.find_community(divorces,n);
  var eiaux2 = functions.find_year(eiaux.v3,y);
  if(eiaux2.v1 == 0){ //No hay error(lo encuentra, ya existe)
    divorces.splice(i, 1); //Elimino objeto
    divorces.push(req.body); //Añado objeto
    console.log("New PUT of resource "+n);
    res.sendStatus(200);
  } else {
    console.log("Resource \""+n+"\" NOT exist");
    res.sendStatus(404);
  }
});

router.delete("/:autonomous_community(\\D+)", (req,res)=>{
  var n = req.params.autonomous_community;
  var prop = "autonomous_community";

  var eiaux = functions.find_community(divorces,n);
  if(eiaux.v1 == 0){ //Lo encuentro en "divorces"
    //divorces.splice(i, 1); //delete divorces[i];
    divorces = functions.deleteParam(divorces,n,prop);
    console.log("New DELETE of resource "+n);
    res.sendStatus(200);
  } else { //No lo encuentro en "divorces"
    console.log("Not DELETE because NOT FOUND "+n);
    res.sendStatus(404);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//OPERACIONES sobre 1 DIVORCE(recurso) ":year"////////////////////////////////////////////////////////////////
router.get("/:year(\\d+)", (req,res)=>{ //"d" patrón para digito
  var y = req.params.year;

  var eiaux2 = functions.find_year(divorces,y);
  if(eiaux2.v1 == 0){ //Error == 0 "NO hay error"
    res.send(eiaux2.v3);
  } else {
    res.sendStatus(404);
  }
});
/*router.post("/:year", (req,res)=>{
  console.log("POST NOT ALLOWED");
  res.sendStatus(405);
});*/
router.put("/:year", (req,res)=>{
  var y = req.body.year;

  var eiaux2 = functions.find_year(divorces,y);
  if(eiaux2.v3.length == 0){ //Hay 0 recurso que cumple el filtro(NOT FOUND)
    console.log("Resource \""+n+"\" NOT exist");
    res.sendStatus(404); //NOT FOUND
  } else if(eiaux2.v3.length == 1){ //Hay 1 recurso que cumple filtro(HAGO PUT)
    divorces.splice(i, 1); //Elimino objeto
    divorces.push(req.body); //Añado objeto
    console.log("New PUT of resource "+n);
    res.sendStatus(200);
  } else { //Hay más de 1 recurso que cumple filtro(NO PUEDO HACER PUT)

  }
});
router.delete("/:year(\\d+)", (req,res)=>{
  var y = req.params.year;
  var prop = "year";

  var eiaux2 = functions.find_year(divorces,y);
  if(eiaux2.v1 == 0){ //Lo encuentro en "divorces"
    divorces = functions.deleteParam(divorces,y,prop); //divorces.splice(i, 1); //delete divorces[i];
    console.log("New DELETE of resource "+y);
    res.sendStatus(200);
  } else { //No lo encuentro en "divorces"
    console.log("Not DELETE because NOT FOUND "+y);
    res.sendStatus(404);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////// Operaciones sobre 1 recurso (autonomous_community/year) ////////////////////////////////////////
router.get("/:autonomous_community/:year", (req,res)=>{
  var n = req.params.autonomous_community;
  var y = req.params.year;
  console.log("New GET of resource "+n+" "+y);

  var eiaux = functions.find_community(divorces,n); //obtengo arrayComunidades
  var ay = functions.find_year(eiaux.v3,y); //obtengo arrayYear de arrayComunidades
  var e = functions.find_year(ay.v3,y);

  if(e.v1 == 0){ //Error == 0 "NO hay error"
    //res.send(divorces[i]);
    res.send(ay.v3);
  } else {
    res.sendStatus(404);
  }
});
//NO PERMITIDO
router.post("/:autonomous_community/:year", (req,res)=>{
  console.log("POST NOT ALLOWED");
  res.sendStatus(405);
});
router.put("/:autonomous_community/:year", (req,res)=>{
  //var n = req.body.year;
  var n = req.body.autonomous_community;
  var y = req.body.year;

  var eiaux = functions.find_community(divorces,n); //obtengo arrayComunidades
  var ay = functions.find_year(eiaux.v3,y); //obtengo arrayYear de arrayComunidades
  var e = functions.find_year(ay.v3,y);
  if(e.v1 == 0){ //No hay error(lo encuentra, ya existe)
    divorces.splice(i, 1); //Elimino objeto
    divorces.push(req.body); //Añado objeto
    console.log("New PUT of resource "+n+" "+y);
    res.sendStatus(200);
  } else {
    console.log("Resource \""+n+" "+y+"\" NOT exist");
    res.sendStatus(404);
  }
});
router.delete("/:autonomous_community/:year", (req,res)=>{
  var n = req.params.autonomous_community;
  var y = req.params.year;

  var eiaux = functions.find_community(divorces,n); //obtengo arrayComunidades
  var ay = functions.find_year(eiaux.v3,y); //obtengo arrayYear de arrayComunidades
  var e = functions.find_year(ay.v3,y);

  if(e.v1 == 0){ //Lo encuentro en "divorces"
    divorces.splice(i, 1); //delete divorces[i];
    console.log("New DELETE of resource "+n);
    res.sendStatus(200);
  } else { //No lo encuentro en "divorces"
    console.log("Not DELETE because NOT FOUND "+n+" "+y);
    res.sendStatus(404);
  }
});



module.exports = router;
