//Inicializar módulos/
var express = require("express");
var bodyParser = require("body-parser"); //Transformar JSON a VARIABLES o viceversa

//Importar Controladores hechos por nosotros
var teamsCtl = require("./teamsFile.js");
var divorcesSpanishCtl = require("./divorcesSpanishFile.js");
var unionsCtl = require('./unions.js');
var telematicMonitoringsCtl = require('./telematicMonitorings.js');

var app = express();
//Puede tener 2 valores, o la variable entorno PORT o 3000
//Evaluación perezosa
var port = (process.env.PORT || 3000);

//Cada vez que llegue JSON <=> Variable
app.use(bodyParser.json());

//Me creo rutas estáticas
app.use("/",express.static(__dirname + '/css')); //Es como si folder "css" no existiera, y estuviera todo en RAIZ
app.use("/",express.static(__dirname + '/html')); //Es como si folder "html" no existiera, y estuviera todo en RAIZ
//app.use('/about/divorces-spanish', express.static(__dirname + '/html/about/divorces-spanish')); //lo que quiero que ponga en url, donde está realmente

//GET para página principal
app.get("/",(req,res) => {
});

//GET para ABOUT
app.get("/about",(req,res) => {
});

//GET para TIME
app.get("/time",(req,res) => {
});

//GET para DIVORCES-SPANISH(Juanlu)
app.get("/about/divorces-spanish",(req,res) => {
  //console.log("Divorces-spanish");
});

//GET para Telematic-monitorings(Ulises)
app.get('/about/telematic-monitorings', (req,res)=>{
  console.log("Telematic-monitorings");
});

//GET para Mortal-victims(Requena)
app.get('/about/mortal-victims', (req,res)=>{
  console.log("Mortal-victims");
});

/////////////////////// Código Juanlu ///////////////////////
/*
//Llamar a controlador OPERACIONES lista teams
app.get("/api/sandbox/teams", teamsCtl.getTeams);
app.post("/api/sandbox/teams", teamsCtl.postTeams);
app.put("/api/sandbox/teams", teamsCtl.putTeams);
app.delete("/api/sandbox/teams", teamsCtl.deleteTeams);
//Llamar a controlador OPERACIONES sobre 1 recurso "/api/sandbox/teams/betis"
app.get("/api/sandbox/teams/:name", teamsCtl.getTeam);
app.post("/api/sandbox/teams/:name", teamsCtl.postTeam);
app.put("/api/sandbox/teams/:name", teamsCtl.putTeam);
app.put("/api/sandbox/teams/:name", teamsCtl.deleteTeam);
app.get("/api-test/teams/loadInitialData", teamsCtl.loadInitialData); //Inicializar teams "/api-test/teams/loadInitialData"

//OPERACIONES lista DIVORCES
app.get("/api/v1/divorces-spanish", divorcesSpanishCtl.getDivorces);
app.post("/api/v1/divorces-spanish", divorcesSpanishCtl.postDivorces);
app.put("/api/v1/divorces-spanish", divorcesSpanishCtl.putDivorces);
app.delete("/api/v1/divorces-spanish", divorcesSpanishCtl.deleteDivorces);
//OPERACIONES sobre 1 DIVORCE(recurso)
app.get("/api/v1/divorces-spanish/:autonomous-community", divorcesSpanishCtl.getDivorce);
app.post("/api/v1/divorces-spanish/:autonomous-community", divorcesSpanishCtl.postDivorce);
app.put("/api/v1/divorces-spanish/:autonomous-community", divorcesSpanishCtl.putDivorce);
app.delete("/api/v1/divorces-spanish/:autonomous-community", divorcesSpanishCtl.deleteDivorce);
app.get("/api/v1/divorces-spanish/loadInitialData", divorcesSpanishCtl.loadInitialData); //Inicializar divorces-spanish "/api/v1/divorces-spanish/loadInitialData"
*/

//Resource Unions
app.get("/api/sandbox/unions", unionsCtl.getUnions);
app.post("/api/sandbox/unions", unionsCtl.postUnions);
app.put("/api/sandbox/unions", unionsCtl.putUnions);
app.delete("/api/sandbox/unions", unionsCtl.deleteUnions);
//Concrete union
app.get("/api/sandbox/unions/:acronym", unionsCtl.getUnion);
app.post("/api/sandbox/unions/:acronym", unionsCtl.postUnion);
app.put("/api/sandbox/unions/:acronym", unionsCtl.putUnion);
app.put("/api/sandbox/unions/:acronym", unionsCtl.deleteUnion);
app.get("/api-test/unions/loadInitialData", unionsCtl.loadInitialData); //Initialize unions "/api-test/unions/loadInitialData"
//Resource telematic-monitorings
app.get("/api/v1/telematic-monitorings", telematicMonitoringsCtl.getTMs);
app.post("/api/v1/telematic-monitorings", telematicMonitoringsCtl.postTMs);
app.put("/api/v1/telematic-monitorings", telematicMonitoringsCtl.putTMs);
app.delete("/api/v1/telematic-monitorings", telematicMonitoringsCtl.deleteTMs);
//Concrete telematic-monitoring
app.get("/api/v1/telematic-monitorings/:province", telematicMonitoringsCtl.getTMs);
app.post("/api/v1/telematic-monitorings/:province", telematicMonitoringsCtl.postTMs);
app.put("/api/v1/telematic-monitorings/:province", telematicMonitoringsCtl.putTMs);
app.delete("/api/v1/telematic-monitorings/:province", telematicMonitoringsCtl.deleteTMs);
app.get("/api/v1/telematic-monitorings/loadInitialData", telematicMonitoringsCtl.loadInitialData); //Initialize telematic-monitorings "/api/v1/telematic-monitorings/loadInitialData"



////////////////////// /api/sandbox/videogames //////////////////////////
var videogames = [{ name: "LeagueOflegends", platform: "Computer", players: "Multiplayer"},
{ name: "BloodBorn", platform: "Playstation", players: "Single"}];

app.get("/api/sandbox/videogames", (req,res) => {
  console.log("New GET of videogames");
  res.send(videogames);
});
app.post("/api/sandbox/videogames", (req,res) => {
  var vg = req.body;
  var e = find_resource(videogames,vg.name)[0];
  if(e == 0){
    res.sendStatus(409);
    console.log("NOT POST because \""+vg.name+"\" exist");
  } else {
    videogames.push(vg);
    console.log("New POST of resource "+vg.name);
    res.sendStatus(200);
  }
});
//NOT ALLOWED - TABLA AZUL
app.put("/api/sandbox/videogames", (req,res) => {
  console.log("PUT NOT ALLOWED");
  res.sendStatus(405);
});
app.delete("/api/sandbox/videogames", (req,res) => {
  console.log("New DELETE of TEAMS");
  videogames.splice(0,videogames.length);
  res.sendStatus(200);
});


app.get("/api/sandbox/videogames/:name", (req,res)=>{
  var n = req.params.name;
  console.log("New GET of resource "+n);
  var e = find_resource(videogames,n)[0];
  var i = find_resource(videogames,n)[1];
  if(e == 0){
    res.send(videogames[i]);
  } else {
    res.sendStatus(404);
  }
});
//NOT ALLOWED - TABLA AZUL
app.post("/api/sandbox/videogames/:name", (req,res) => {
  console.log("POST NOT ALLOWED");
  res.sendStatus(405);
});

app.put("/api/sandbox/videogames/:name", (req,res) => {
  var n = req.body.name;
  var e = find_resource(videogames,n)[0];
  var i = find_resource(videogames,n)[1];
  if(e == 0){
    videogames.splice(i, 1);
    videogames.push(req.body);
    console.log("New PUT of resource "+n);
    res.sendStatus(200);
  } else {
    console.log("Resource \""+n+"\" NOT exist");
    res.sendStatus(404);
  }
});
app.delete("/api/sandbox/videogames/:name", (req,res) => {
  var n = req.params.name;
  var e = find_resource(videogames,n)[0];
  var i = find_resource(videogames,n)[1];
  if(e == 0){
    videogames.splice(i, 1);
    console.log("New DELETE of resource "+n);
    res.sendStatus(200);
  } else {
    console.log("Not DELETE because NOT FOUND "+n);
    res.sendStatus(404);
  }
});

app.get("/api-test/videogames/loadInitialData", (req,res)=>{
  console.log("/api-test/videogames/loadInitialData");
  videogames = [
        { name: "LeagueOfLegends", platform: "Computer", players:"Multiplayer"},
        { name: "BloodBorn", platform: "PlayStation", players:"Single"},
        { name: "Halo", platform: "Xbox", players: "Multiplayer"}
  ];
  res.send(videogames);
});
////////////////////////////////////////////////////////////////////////////////

//app.listen(3000); //Para probar en local
//app.listen(process.env.PORT); //variable entorno para puerto que me dice Heroku
//Hago callback porque es asincrono
app.listen(port, ()=>{
  console.log("Ready to go! port "+port);
});
