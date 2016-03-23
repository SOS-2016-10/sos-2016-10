//Inicializar módulos/
var express = require("express");
var bodyParser = require("body-parser"); //Transformar JSON a VARIABLES o viceversa

//Importar Controladores hechos por nosotros
var teamsCtl = require("./teamsFile.js");
var divorcesSpanishCtl = require("./divorcesSpanishFile.js");

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



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////// /api/sandbox/unions

var unions = [{acronym:"CGT",name:"Confederacion general del trabajo"}];

app.get("/api/sandbox/unions", (req,res)=>{
  console.log("New request of unions.");
  res.send(unions);
});

app.post("/api/sandbox/unions", (req, res)=>{
  var sind = req.body;
  if(unions.indexOf(sind)==-1){
    unions.push(sind);
    res.sendStatus(200);
    console.log("New post of resource: "+sind.acronym);
  }else{
    res.sendStatus(406);
    console.log("New post of already exiting labor unions: "+sind.acronym);
  }

});

app.put("/api/sandbox/unions", (req,res)=>{
  console.log("Put not allowed.");
  res.sendStatus(405);
});

app.delete("/api/sandbox/unions", (req,res)=>{
  console.log("Deleting unions.");
  unions = [];
  res.sendStatus(200);
});

/////////////////////////////////////// CONCRETE OBJECTS
function search(array, acronym){
  for(var i = 0;i<array.length;i++){
    if(array[i].acronym == acronym){
      return i;
    }
  }
  return -1;
}

app.get("/api/sandbox/unions/:acronym", (req,res)=>{
  var s = req.params.acronym;
  console.log("New get of "+s);
  index = search(unions, s);
  if(index == -1){
    res.sendStatus(404);
  }else{
    res.send(unions[index]);
  }
});

app.post("/api/sandbox/unions/:acronym", (req,res)=>{
  res.sendStatus(405);
  console.log("Post not allowed.")
});

app.put("/api/sandbox/unions/:acronym", (req,res)=>{
  var s = req.params.acronym;
  console.log("New put of "+s);
  index = search(unions, s);
  if(index == -1){
    res.sendStatus(404);
  }else{
    unions[index] = req.body;
    res.sendStatus(200);
  }
});

app.delete("/api/sandbox/unions/:acronym", (req,res)=>{
  var s = req.params.acronym;
  index = search(unions, s);
  if(index == -1){
    var s = req.params.siglas;
    console.log("Can not be delete "+s);
    res.sendStatus(404);
  }else{
    console.log("New delete of "+s);
    unions.splice(index,1);
    res.sendStatus(200);
  }
});

app.get("/api-test/unions/loadInitialData", (req,res)=>{
  u1 = {acronym:"TUC",name:"Trade union congress"};
  u2 = {acronym:"LTC",name:"London trades council"};
  unions.push(u1);
  unions.push(u2);
  res.sendStatus(200);
});
//end of /api/sandbox/unions



//app.listen(3000); //Para probar en local
//app.listen(process.env.PORT); //variable entorno para puerto que me dice Heroku
//Hago callback porque es asincrono
app.listen(port, ()=>{
  console.log("Ready to go! port "+port);
});
