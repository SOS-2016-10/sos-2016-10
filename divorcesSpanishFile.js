var express = require("express");
var app = express();

///Array sobre el que hago las operaciones
var divorces = [{ autonomous_community: "andalucia", year: 2014, age_0_18: 1, age_19_24: 56, age_25_29: 537, age_30_34: 1860 },
{ autonomous_community: "aragon", year: 2014, age_0_18: 0, age_19_24: 6, age_25_29: 69, age_30_34: 235 },
{ autonomous_community: "andalucia", year: 2013, age_0_18: 3, age_19_24: 77, age_25_29: 607, age_30_34: 1956 } ]; //No es JSON(es JavaScript)

//Función para buscar en array "divorces" en mi caso
function find_resource(array,name){
  for(var i=0;i<array.length;i++){
    if(array[i].autonomous_community == name){
      //console.log(array[i]);
      var error = 0; //No hay error
      break;
    } else {
      var error = 1; //Hay error
    }
  }
  return [error, i];
}

//find_community
function find_community(array,name){
  var aux = []; //Me creo array vacío
  for(var i=0;i<array.length;i++){
    if(array[i].autonomous_community == name){
      //console.log(array[i]);
      var error = 0; //No hay error
      //break;
      aux.push(array[i]);
    } //else {
      //var error = 1; //Hay error
    //}
  }
  if(aux.length == 0){
    var error = 1; //Hay error
  }
  return [error, i, aux];
}

//find_year
function find_year(array,year){
  var aux2 = []; //Me creo array vacío
  for(var i=0;i<array.length;i++){
    if(array[i].year == year){
      var error = 0; //No hay error
      aux2.push(array[i]);
    }
  }
  if(aux2.length == 0){
    var error = 1; //Hay error
  }
  return [error, i, aux2];
}

//////////////////// Operaciones sobre lista de recursos ////////////////////
module.exports.getDivorces = (req,res)=>{

  if(Object.keys(req.query).length == 0){ //No hay busqueda
    console.log("New GET of \"divorces-spanish\"");
    res.send(divorces);
  } else { //Hay parámetros de busqueda
    var aux3 = [];
    var aux4 = [];
    //Hago el BUCLE según el nº de parámetros
    for(var i=0;i<Object.keys(req.query).length;i++){
      var valor = Object.keys(req.query)[i];

      if(i == 0){ //////////1ª vez que entro en bucle
        //Recorro array dado
        for(var j=0;j<divorces.length;j++){
          var v = req.query[valor]; //obtengo el contenido de la request
          if(divorces[j][valor] == v){
            var error = 0; //No hay error
            aux3.push(divorces[j]);
          }
        }
        if(aux3.length == 0){
          var error = 1; //Hay error
        }
      } else { //////////Resto de veces que entro en bucle(aux3 ya está lleno)
        for(var j=0;j<aux3.length;j++){
          var v = req.query[valor]; //obtengo el contenido de la request
          if(aux3[j][valor] == v){
            var error = 0; //No hay error
            aux4.push(aux3[j]);
          }
        }
        aux3 = aux4;
        if(aux4.length == 0){
          var error = 1; //Hay error
        }
      }

    } //FIN for principal
    if(aux4.length == 0){//Devuelvo 1 cosa u otra
      res.send(aux3);
    } else {
      res.send(aux4);
    }
  }
}
module.exports.postDivorces = (req,res)=>{
  var divorce = req.body;

  //comprobar antes que no existe esa "autonomous_community" ya
  var e = find_resource(divorces,divorce.autonomous_community)[0];
  if(e == 0){ //No hay error(lo encuentra, ya existe)
    res.sendStatus(409); //Conflict
    console.log("NOT POST because \""+divorce.autonomous_community+"\" exist");
  } else {
    divorces.push(divorce);
    console.log("New POST of resource "+divorce.autonomous_community);
    res.sendStatus(201); //CREATED
  }
}
//NO PERMITIDO
module.exports.putDivorces = (req,res)=>{
  console.log("PUT NOT ALLOWED");
  res.sendStatus(405);
}
module.exports.deleteDivorces = (req,res)=>{
  console.log("New DELETE of \"divorces-spanish\"");
  divorces.splice(0,divorces.length);
  res.sendStatus(200);
}

//////////////////// Operaciones sobre 1 recurso (autonomous_community) ////////////////////
module.exports.getDivorce = (req,res)=>{
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
}
//NO PERMITIDO
module.exports.postDivorce = (req,res)=>{
  console.log("POST NOT ALLOWED");
  res.sendStatus(405);
}
module.exports.putDivorce = (req,res)=>{
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
}
module.exports.deleteDivorce = (req,res)=>{
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
}

//Para inicializar la API REST "divorces-spanish" ///////////////////////////
// /api/v1/divorces-spanish/loadInitialData“
module.exports.loadInitialData = (req,res)=>{
  console.log("/api/v1/divorces-spanish/loadInitialData");
  /*var divorces = [
        { autonomous_community: "canarias", year: 2014, age_0_18: 0, age_19_24: 10, age_25_29: 149, age_30_34: 429 },
        { autonomous_community: "cantabria", year: 2014, age_0_18: 0, age_19_24: 5, age_25_29: 25, age_30_34: 103 },
        { autonomous_community: "extremadura", year: 2014, age_0_18: 0, age_19_24: 3, age_25_29: 39, age_30_34: 180 },
        { autonomous_community: "galicia", year: 2014, age_0_18: 0, age_19_24: 19, age_25_29: 167, age_30_34: 492 },
        { autonomous_community: "ceuta", year: 2014, age_0_18: 0, age_19_24: 0, age_25_29: 10, age_30_34: 31 },
        { autonomous_community: "andalucia", year: 2013, age_0_18: 3, age_19_24: 77, age_25_29: 607, age_30_34: 1956 },
        { autonomous_community: "andalucia", year: 2014, age_0_18: 1, age_19_24: 56, age_25_29: 537, age_30_34: 1860 }
  ];*/
  divorces.push({ autonomous_community: "canarias", year: 2014, age_0_18: 0, age_19_24: 10, age_25_29: 149, age_30_34: 429 });
  divorces.push({ autonomous_community: "cantabria", year: 2014, age_0_18: 0, age_19_24: 5, age_25_29: 25, age_30_34: 103 });
  divorces.push({ autonomous_community: "extremadura", year: 2014, age_0_18: 0, age_19_24: 3, age_25_29: 39, age_30_34: 180 });
  divorces.push({ autonomous_community: "galicia", year: 2014, age_0_18: 0, age_19_24: 19, age_25_29: 167, age_30_34: 492 });
  divorces.push({ autonomous_community: "ceuta", year: 2014, age_0_18: 0, age_19_24: 0, age_25_29: 10, age_30_34: 31 });
  divorces.push({ autonomous_community: "andalucia", year: 2013, age_0_18: 3, age_19_24: 77, age_25_29: 607, age_30_34: 1956 });
  divorces.push({ autonomous_community: "andalucia", year: 2014, age_0_18: 1, age_19_24: 56, age_25_29: 537, age_30_34: 1860 });
  //res.send(divorces);
  res.sendStatus(200);
}

//////////////////// Operaciones sobre 1 recurso (autonomous_community/year) ////////////////////
module.exports.getDivorceYear = (req,res)=>{
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
}
//NO PERMITIDO
module.exports.postDivorceYear = (req,res)=>{
  console.log("POST NOT ALLOWED");
  res.sendStatus(405);
}
module.exports.putDivorceYear = (req,res)=>{
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
}
module.exports.deleteDivorceYear = (req,res)=>{
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
}

//OPERACIONES sobre 1 DIVORCE(recurso) ":year"
module.exports.getYear = (req,res)=>{
}
module.exports.postYear = (req,res)=>{
}
module.exports.putYear = (req,res)=>{
}
module.exports.deleteYear = (req,res)=>{
}
