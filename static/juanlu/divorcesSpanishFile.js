//SIN APIKEY
var express = require("express");
var app = express();
var router = express.Router();
var functions = require('./functions.js'); //Importo funciones
var bodyParser = require('body-parser');
var passport = require('passport'); //Para APIKEY

var LocalAPIKeyStrategy = require('passport-localapikey-update').Strategy;

passport.use(new LocalAPIKeyStrategy((apikey, done)=> { done(null,apikey); }));

WriteAccess = (req, res, next)=> {
    passport.authenticate('localapikey', (err, apikey, info) =>{
        if(!apikey){
            return res.sendStatus(401);
        }else if (apikey!="juanluw") {
            return res.sendStatus(403);
        }
        return next();
    })(req, res, next);
};

ReadAccess = (req, res, next)=> {
    passport.authenticate('localapikey', (err, apikey, info) =>{
        if(!apikey){
          return res.sendStatus(401);
        }else if (apikey!="juanlur") {
          return res.sendStatus(403);
        }
        return next();
    })(req, res, next);
};


router.use(bodyParser.json());

///Array sobre el que hago las operaciones
var divorces = [];

//Para inicializar la API REST "divorces-spanish" ///////////////////////////////////////////////////////////////
// /api/v1/divorces-spanish/loadInitialData“ ////////////////////////////////////////////////////////////////////
router.get("/loadInitialData", WriteAccess, (req,res)=>{
  if(divorces.length == 0){ //Cargo los datos si está vacío
    console.log("/api/v1/divorces-spanish/loadInitialData");
    ////divorces = functions.loadInitialData();
    ///divorces = [{ "autonomous_community": "canarias", "year": 2014, "age_0_18": 0, "age_19_24": 10, "age_25_29": 149, "age_30_34": 429 }];
    divorces.push({ autonomous_community: "canarias", year: 2014, age_0_18: 0, age_19_24: 10, age_25_29: 149, age_30_34: 429 });//No es JSON(es JavaScript)
    divorces.push({ autonomous_community: "cantabria", year: 2014, age_0_18: 0, age_19_24: 5, age_25_29: 25, age_30_34: 103 });
    divorces.push({ autonomous_community: "extremadura", year: 2014, age_0_18: 0, age_19_24: 3, age_25_29: 39, age_30_34: 180 });
    divorces.push({ autonomous_community: "galicia", year: 2014, age_0_18: 0, age_19_24: 19, age_25_29: 167, age_30_34: 492 });
    divorces.push({ autonomous_community: "ceuta", year: 2014, age_0_18: 0, age_19_24: 0, age_25_29: 10, age_30_34: 31 });
    divorces.push({ autonomous_community: "andalucia", year: 2013, age_0_18: 3, age_19_24: 77, age_25_29: 607, age_30_34: 1956 });
    divorces.push({ autonomous_community: "andalucia", year: 2014, age_0_18: 1, age_19_24: 56, age_25_29: 537, age_30_34: 1860 });
    //res.send(divorces);
    ///JSON.stringify(divorces);
    ///JSON.parse(divorces);
    res.sendStatus(200); //OK
  } else {
    console.log("No charge DATA, because exist data");
    res.sendStatus(409); //Conflict
  }
});

////////////////////////////////////////////////////////////////////////////////////////
//////////////////// Operaciones sobre lista de recursos ////////////////////
router.get("/", ReadAccess, (req,res)=>{
  var q = req.query;
  var aux = [];
  if(Object.keys(q).length == 1){ //No hay busqueda(nº parámetros = 0)
    console.log("New GET of \"divorces-spanish\"");
    res.send(divorces);
  } else { //Hay parámetros de busqueda
    console.log("New GET to "+q);
    var aux = functions.search(divorces,q);
    if((q.limit != undefined) && (q.offset != undefined)){//Pagination
      if(Object.keys(q).length == 3){ //Only LIMIT and OFFSET
        aux = functions.pagination(q.limit,q.offset,divorces);
      } else {
        aux = functions.pagination(q.limit,q.offset,aux);
      }
    }
    res.send(aux);
  }
});
router.post("/", WriteAccess, (req,res)=>{
  var divorce = req.body;
  if(Object.keys(divorce).length != 6){
    res.sendStatus(400); //BAD REQUEST
  } else {
    //comprobar antes que no existe esa "autonomous_community" ya y ese "year"
    var eiaux = functions.find_community(divorces,req.body.autonomous_community);//functions.find_resource(divorces,divorce.autonomous_community)[0];
    var eiaux2 = functions.find_year(eiaux,req.body.year);
    if((eiaux.length != 0) && (eiaux2.length != 0)){ //(lo encuentra, ya existe)
      res.sendStatus(409); //Conflict
      console.log("NOT POST because \""+divorce.autonomous_community+"\" or \""+divorce.year+"\" exist");
    } else {
      divorces.push(divorce);
      console.log("New POST of resource "+divorce.autonomous_community+" "+divorce.year);
      res.sendStatus(201); //CREATED
    }
  }
});
//NO PERMITIDO
router.put("/", WriteAccess, (req,res)=>{
  console.log("PUT NOT ALLOWED");
  res.sendStatus(405);
});
router.delete("/", WriteAccess, (req,res)=>{
  console.log("New DELETE of \"divorces-spanish\"");
  functions.deleteAll(divorces);
  res.sendStatus(200);
});

/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////// Operaciones sobre 1 recurso (autonomous_community) ////////////////////
router.get("/:autonomous_community(\\D+)", ReadAccess, (req,res)=>{ //"D+" patrón para NO dígitos(letras)
  var n = req.params.autonomous_community;
  console.log("New GET of resource "+n);

  var eiaux = functions.find_community(divorces,n);
  if(eiaux.length != 0){ //Hay datos
    res.send(eiaux);
  } else {
    res.sendStatus(404);
  }
});
//NO PERMITIDO
router.post("/:autonomous_community", WriteAccess, (req,res)=>{
  console.log("POST NOT ALLOWED");
  res.sendStatus(405);
});

router.put("/:autonomous_community", WriteAccess, (req,res)=>{
  var n = req.body.autonomous_community;

  var eiaux = functions.find_community(divorces,n);
  //var eiaux2 = functions.find_year(eiaux.v3,y);
  if(eiaux.length == 0){ //Hay 0 recurso que cumple el filtro(NOT FOUND)
    console.log("Resource \""+n+"\" NOT exist");
    res.sendStatus(404);
  } else if(eiaux.length == 1){ //Hay 1 recurso que cumple filtro(HAGO PUT)
    divorces.splice(i, 1); //Elimino objeto
    divorces.push(req.body); //Añado objeto
    console.log("New PUT of resource "+n);
    res.sendStatus(200);
  } else { //Hay más de 1 recurso que cumple filtro(NO PUEDO HACER PUT)
    res.send(409); //Conflict
  }
});

router.delete("/:autonomous_community(\\D+)", WriteAccess, (req,res)=>{
  var n = req.params.autonomous_community;
  var prop = "autonomous_community";

  var eiaux = functions.find_community(divorces,n);
  if(eiaux.length != 0){ //Lo encuentro en "divorces"
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
router.get("/:year(\\d+)", ReadAccess, (req,res)=>{ //"d" patrón para digito
  var y = req.params.year;

  var eiaux2 = functions.find_year(divorces,y);
  if(eiaux2.length != 0){ //Error == 0 "NO hay error"
    res.send(eiaux2);
  } else {
    res.sendStatus(404);
  }
});
router.put("/:year", WriteAccess, (req,res)=>{
  var y = req.body.year;

  var eiaux2 = functions.find_year(divorces,y);
  if(eiaux2.length == 0){ //Hay 0 recurso que cumple el filtro(NOT FOUND)
    console.log("Resource \""+y+"\" NOT exist");
    res.sendStatus(404); //NOT FOUND
  } else if(eiaux2.length == 1){ //Hay 1 recurso que cumple filtro(HAGO PUT)
    divorces.splice(i, 1); //Elimino objeto
    divorces.push(req.body); //Añado objeto
    console.log("New PUT of resource "+y);
    res.sendStatus(200);
  } else { //Hay más de 1 recurso que cumple filtro(NO PUEDO HACER PUT)
    res.send(409); //Conflict
  }
});
router.delete("/:year(\\d+)", WriteAccess, (req,res)=>{
  var y = req.params.year;
  var prop = "year";

  var eiaux2 = functions.find_year(divorces,y);
  if(eiaux2.length != 0){ //Lo encuentro en "divorces"
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
router.get("/:autonomous_community/:year", ReadAccess, (req,res)=>{
  var n = req.params.autonomous_community;
  var y = req.params.year;
  console.log("New GET of resource "+n+" "+y);

  var eiaux = functions.find_community(divorces,n); //obtengo arrayComunidades
  var ay = functions.find_year(eiaux,y); //obtengo arrayYear de arrayComunidades

  if(ay.length != 0){ //Encuentro datos
    res.send(ay);
  } else {
    res.sendStatus(404);
  }
});
//NO PERMITIDO
router.post("/:autonomous_community/:year", WriteAccess, (req,res)=>{
  console.log("POST NOT ALLOWED");
  res.sendStatus(405);
});
router.put("/:autonomous_community/:year", WriteAccess, (req,res)=>{
  var n = req.body.autonomous_community;
  var y = req.body.year;
  var nn = req.params.autonomous_community;
  var yy = req.params.year;

  if((n != nn) || (y != yy)){
    console.log("400 BAD REQUEST");
    res.sendStatus(400);
  } else if(Object.keys(req.body).length != 6){
    res.sendStatus(400); //BAD REQUEST
  } else {
    var eiaux = functions.find_community(divorces,n); //obtengo arrayComunidades
    var ay = functions.find_year(eiaux,y); //obtengo arrayYear de arrayComunidades
    if(ay.length == 1){ //Si hay 1 elemento(ACTUALIZO)
        functions.deleteOneResource(divorces,n,y);
        divorces.push(req.body); //Añado objeto
        console.log("New PUT of resource "+n+" "+y);
        res.sendStatus(200);
      } else {
      console.log("Resource \""+n+" "+y+"\" NOT exist");
      res.sendStatus(404);
    }
  }
});
router.delete("/:autonomous_community/:year", WriteAccess, (req,res)=>{
  var n = req.params.autonomous_community;
  var y = req.params.year;

  var eiaux = functions.find_community(divorces,n); //obtengo arrayComunidades
  var ay = functions.find_year(eiaux,y); //obtengo arrayYear de arrayComunidades
  if(ay.length == 1){ //Si hay 1 elemento(ELIMINO)
    functions.deleteOneResource(divorces,n,y);
    console.log("New DELETE of resource "+n);
    res.sendStatus(200);
  } else { //No lo encuentro en "divorces"
    console.log("Not DELETE because NOT FOUND "+n+" "+y);
    res.sendStatus(404);
  }
});



module.exports = router;
