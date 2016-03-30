//Inicializar módulos/
var express = require("express");
var bodyParser = require("body-parser"); //Transformar JSON a VARIABLES o viceversa

//Importar Controladores hechos por nosotros
var teamsCtl = require("./teamsFile.js");
var divorcesSpanishCtl = require("./divorcesSpanishFile.js");
var unionsCtl = require("./unions.js");
var telematicMonitoringsCtl = require("./telematicMonitorings.js");
var videogamesCtl = require("./videogames.js");
var mortalVictimsCtl = require("./mortalVictims.js");

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

//////////////////////////////////////////////////////////////
/////////////////////// Código Juanlu ///////////////////////

//Llamar a controlador OPERACIONES lista teams
app.use("/api/sandbox/teams", teamsCtl);
/*app.get("/api-test/teams/loadInitialData", teamsCtl.loadInitialData); //Inicializar teams "/api-test/teams/loadInitialData"
app.get("/api/sandbox/teams", teamsCtl.getTeams);
app.post("/api/sandbox/teams", teamsCtl.postTeams);
app.put("/api/sandbox/teams", teamsCtl.putTeams);
app.delete("/api/sandbox/teams", teamsCtl.deleteTeams);
//Llamar a controlador OPERACIONES sobre 1 recurso "/api/sandbox/teams/betis"
app.get("/api/sandbox/teams/:name", teamsCtl.getTeam);
app.post("/api/sandbox/teams/:name", teamsCtl.postTeam);
app.put("/api/sandbox/teams/:name", teamsCtl.putTeam);
app.put("/api/sandbox/teams/:name", teamsCtl.deleteTeam);*/

//OPERACIONES lista DIVORCES
app.use("/api/v1/divorces-spanish", divorcesSpanishCtl);
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

////////////////////////////////////////////////////////////////////////////////
////////////////////////////      ULISES      //////////////////////////////////
//Resource Unions
app.get("/api/v1/telematic-monitorings/loadInitialData", telematicMonitoringsCtl.loadInitialData); //Initialize telematic-monitorings "/api/v1/telematic-monitorings/loadInitialData"
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
app.get("/api/v1/telematic-monitorings/:province", telematicMonitoringsCtl.getTM);
app.post("/api/v1/telematic-monitorings/:province", telematicMonitoringsCtl.postTM);
app.put("/api/v1/telematic-monitorings/:province", telematicMonitoringsCtl.putTM);
app.delete("/api/v1/telematic-monitorings/:province", telematicMonitoringsCtl.deleteTM);

//VIDEOGAMES - MORTAL-VICTIMS
//Videogames
//Initialize test data "/api-test/videogames/loadInitialData"
app.get("/api-test/teams/loadInitialData", videogamesCtl.loadInitialData);
/// Calling videogames resource
app.get("/api/sandbox/videogames", videogamesCtl.getVideogames);
app.post("/api/sandbox/videogames", videogamesCtl.postVideogames);
app.put("/api/sandbox/videogames", videogamesCtl.putVideogames);
app.delete("/api/sandbox/videogames", videogamesCtl.deleteVideogames);
// Calling videogames concrete resource
app.get("/api/sandbox/videogames/:name", videogamesCtl.getVideogame);
app.post("/api/sandbox/videogames/:name", videogamesCtl.postVideogame);
app.put("/api/sandbox/videogames/:name", videogamesCtl.putVideogame);
app.put("/api/sandbox/videogames/:name", videogamesCtl.deleteVideogame);

//mortal-victims
//initialize mortal-victims test data "/api/v1/mortal-victims/loadInitialData"
app.get("/api/v1/mortal-victims/loadInitialData", mortalVictimsCtl.loadInitialData);
// Calling mortal-victims resource
app.get("/api/v1/mortal-victims", mortalVictimsCtl.getVictims);
app.post("/api/v1/mortal-victims", mortalVictimsCtl.postVictims);
app.put("/api/v1/mortal-victims", mortalVictimsCtl.putVictims);
app.delete("/api/v1/mortal-victims", mortalVictimsCtl.deleteVictims);
//Calling mortal-victims concrete resource
app.get("/api/v1/mortal-victims/:autonomous_community", mortalVictimsCtl.getVictim);
app.post("/api/v1/mortal-victims/:autonomous_community", mortalVictimsCtl.postVictim);
app.put("/api/v1/mortal-victims/:autonomous_community", mortalVictimsCtl.putVictim);
app.delete("/api/v1/mortal-victims/:autonomous_community", mortalVictimsCtl.deleteVictim);



//app.listen(3000); //Para probar en local
//app.listen(process.env.PORT); //variable entorno para puerto que me dice Heroku
//Hago callback porque es asincrono
app.listen(port, ()=>{
  console.log("Ready to go! port "+port);
});
