var express = require("express");
var router = express.Router();

// /api/sandbox/teams ////////////////////////////////////////////
var teams = [{ name: "Betis", stadium: "Benito Villamarín"},
{ name: "Sevilla", stadium: "Ramón Sánchez-Pizjuán"}]; //No es JSON(es JavaScript)

//Función para buscar en array "teams" en mi caso
function find_resource(array,name){
  for(var i=0;i<array.length;i++){
    if(array[i].name == name){
      //console.log(array[i]);
      var error = 0; //No hay error
      break;
    } else {
      var error = 1; //Hay error
    }
  }
  return [error, i];
}

//module.exports.getTeams = (req,res)=>{
router.get("/", (req,res)=>{
  console.log("New GET of TEAMS");
  res.send(teams);
});
//module.exports.postTeams = (req,res)=>{
router.post("/", (req,res)=>{
  var team = req.body;

  //comprobar antes que no existe ese "name" ya
  var e = find_resource(teams,team.name)[0];
  if(e == 0){ //No hay error(lo encuentra, ya existe)
    res.sendStatus(409); //Conflict
    console.log("NOT POST because \""+team.name+"\" exist");
  } else {
    teams.push(team);
    console.log("New POST of resource "+team.name);
    res.sendStatus(200);
  }
});

//NO PERMITIDO
//module.exports.putTeams = (req,res)=>{
router.put("/", (req,res)=>{
  console.log("PUT NOT ALLOWED");
  res.sendStatus(405);
});
//module.exports.deleteTeams = (req,res)=>{
router.delete("/", (req,res)=>{
  console.log("New DELETE of TEAMS");
  teams.splice(0,teams.length);
  res.sendStatus(200);
});

// /api/sandbox/teams/betis ////////////////
//module.exports.getTeam = (req,res)=>{
router.get("/:name", (req,res)=>{
  var n = req.params.name;
  console.log("New GET of resource "+n);

  var e = find_resource(teams,n)[0];
  var i = find_resource(teams,n)[1];
  if(e == 0){ //Error == 0 "NO hay error"
    res.send(teams[i]);
  } else {
    res.sendStatus(404);
  }
});
//NO PERMITIDO
//module.exports.postTeam = (req,res)=>{
router.post("/:name", (req,res)=>{
  console.log("POST NOT ALLOWED");
  res.sendStatus(405);
});
//module.exports.putTeam = (req,res)=>{
router.put("/:name", (req,res)=>{
  //var n = req.params.name;
  var n = req.body.name;

  var e = find_resource(teams,n)[0];
  var i = find_resource(teams,n)[1];
  if(e == 0){ //No hay error(lo encuentra, ya existe)
    teams.splice(i, 1); //Elimino objeto
    teams.push(req.body); //Añado objeto
    console.log("New PUT of resource "+n);
    res.sendStatus(200);
  } else {
    console.log("Resource \""+n+"\" NOT exist");
    res.sendStatus(404);
  }
});
//module.exports.deleteTeam = (req,res)=>{
router.delete("/:name", (req,res)=>{
  var n = req.params.name;

  var e = find_resource(teams,n)[0];
  var i = find_resource(teams,n)[1];
  if(e == 0){ //Lo encuentro en "teams"
    teams.splice(i, 1); //delete teams[i];
    console.log("New DELETE of resource "+n);
    res.sendStatus(200);
  } else { //No lo encuentro en "teams"
    console.log("Not DELETE because NOT FOUND "+n);
    res.sendStatus(404);
  }
});

//Para inicializar la API REST "teams" ///////////////////////////
// /api-test/XXXXX/loadInitialData“
//module.exports.loadInitialData = (req,res)=>{
router.get("/loadInitialData", (req,res)=>{
  console.log("/api-test/teams/loadInitialData");
  teams = [
        { name: "Betis", stadium: "Benito Villamarín"},
        { name: "Sevilla", stadium: "Ramón Sánchez-Pizjuán"},
        { name: "Real Madrid", stadium: "Santiago Bernabéu"},
        { name: "Valencia", stadium: "Mestalla"}
  ];
  res.send(teams);
  //res.sendStatus(200);
});
module.exports = router;
