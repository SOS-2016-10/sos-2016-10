//Inicializar módulos/
var express = require("express");
var bodyParser = require("body-parser"); //Transformar JSON a VARIABLES o viceversa

//Importar Controladores hechos por nosotros

var app = express();
//Puede tener 2 valores, o la variable entorno PORT o 3000
//Evaluación perezosa
var port = (process.env.PORT || 3000);

//Cada vez que llegue JSON <=> Variable
app.use(bodyParser.json());
//app.listen(3000); //Para probar en local
//app.listen(process.env.PORT); //variable entorno para puerto que me dice Heroku
//Hago callback porque es asincrono
app.listen(port, ()=>{
  console.log("Ready to go! port "+port);
});

//Me creo rutas estáticas
app.use("/",express.static(__dirname + '/static/css')); //Es como si folder "css" no existiera, y estuviera todo en RAIZ
app.use("/",express.static(__dirname + '/static/html')); //Es como si folder "html" no existiera, y estuviera todo en RAIZ
//app.use('/about/divorces-spanish', express.static(__dirname + '/html/about/divorces-spanish')); //lo que quiero que ponga en url, donde está realmente

var teamsCtl = require("./static/juanlu/teamsFile.js");
var divorcesSpanishCtl = require("./static/juanlu/divorcesSpanishFile.js");
var unionsCtl = require("./ulises/unions.js");
var telematicMonitorings = require("./ulises/telematicMonitorings.js");
var videogamesCtl = require("./videogames.js");
var mortalVictimsCtl = require("./mortalVictimsFile.js");

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
//Llamar a API "TEAMS"
app.use("/api/sandbox/teams", teamsCtl);
//Llamar a API "DIVORCES-SPANISH"
app.use("/api/v1/divorces-spanish", divorcesSpanishCtl);


////////////////////////////////////////////////////////////////////////////////
////////////////////////////      ULISES      //////////////////////////////////
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
//Acceso a recursos API REST telematic-monitorings
app.use('/api/v1/telematic-monitorings', telematicMonitorings);

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
app.get("/api/v1/mortal-victims/", mortalVictimsCtl.getVictims);

app.post("/api/v1/mortal-victims/", mortalVictimsCtl.postVictims);

app.put("/api/v1/mortal-victims/", mortalVictimsCtl.putVictims);

app.delete("/api/v1/mortal-victims/", mortalVictimsCtl.deleteVictims);

app.get("/api/v1/mortal-victims/:dat", mortalVictimsCtl.getVictim);

app.get("/api/v1/mortal-victims/:autonomous_community/:year", mortalVictimsCtl.getVictimYear);

app.post("/api/v1/mortal-victims/:autonomous_community", mortalVictimsCtl.postVictim);

app.put("/api/v1/mortal-victims/:autonomous_community", mortalVictimsCtl.putVictim);

app.put("/api/v1/mortal-victims/:autonomous_community/:dat", mortalVictimsCtl.putVictimDat);

app.delete("/api/v1/mortal-victims/:autonomous_community", mortalVictimsCtl.deleteVictim);
