///Ejecución ASINCRONA con EXPRESS
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
//Puede tener 2 valores, o la variable entorno PORT o 3000
//Evaluación perezosa
var port = (process.env.PORT || 3000);

//
app.use(bodyParser.json());

//Me creo rutas estáticas
app.use("/",express.static(__dirname + '/css')); //Es como si folder "css" no existiera, y estuviera todo en RAIZ
app.use("/",express.static(__dirname + '/html')); //Es como si folder "html" no existiera, y estuviera todo en RAIZ
//app.use('/about/divorces-spanish', express.static(__dirname + '/html/about/divorces-spanish')); //lo que quiero que ponga en url, donde está realmente

//GET para página principal
app.get("/",(req,res) => {
  console.log("Main Menu");
});

//GET para ABOUT
app.get("/about",(req,res) => {
  console.log("About");
});

//GET para TIME
app.get("/time",(req,res) => {
  console.log("New request to TIME arrived!");
});

//GET para DIVORCES-SPANISH(Juanlu)
app.get("/about/divorces-spanish",(req,res) => {
  console.log("Divorces-spanish");
});


//GET para Telematic-monitorings(Ulises)
app.get('/about/telematic-monitorings', (req,res)=>{
  console.log("Telematic-monitorings");
});

//GET para Mortal-victims(Requena)
app.get('/about/mortal-victims', (req,res)=>{
  console.log("Mortal-victims");
});

// /api/sandbox/teams ////////////////////////////////////////////
//var contacts = [{ name : "pepe"}];                            //
var teams = [{ name : "sevilla"}];                              //
app.get("/api/sandbox/teams", (req,res) => {                    //
  console.log("New GET of TEAMS");                              //
  res.send(teams);                                              //
});                                                             //
app.post("/api/sandbox/teams", (req,res) => {                   //
  var team = req.body;                                          //
  //comprobar antes que no existe ese "name" ya                 //
  teams.push(team);                                             //
  console.log("New POST of resource "+team.name);               //
  res.sendStatus(200);                                          //
});                                                             //
//NO PERMITIDO                                                  //
app.put("/api/sandbox/teams", (req,res) => {                    //
  console.log("PUT NOT ALLOWED");                               //
  res.sendStatus(405);                                          //
});                                                             //
app.delete("/api/sandbox/teams", (req,res) => {                 //
  console.log("New DELETE of TEAMS");                           //
  teams.splice(0,teams.length);                                 //
  //teams.remove(); NO FUNCIONA                                 //
  res.sendStatus(200);                                          //
});                                                             //
                                                                //
// /api/sandbox/teams/betis //////////////////////////////////////
app.get("/api/sandbox/teams/:name", (req,res)=>{                 //
  var n = req.params.name;                                      //
  console.log("New GET of resource "+n);                        //
  res.send(teams[0]);                                           //
});                                                             //
//NO PERMITIDO                                                  //
app.post("/api/sandbox/teams/:name", (req,res) => {              //
  console.log("POST NOT ALLOWED");                              //
  res.sendStatus(405);                                          //
});                                                             //
app.put("/api/sandbox/teams/:name", (req,res) => {              //
  var n = req.params.name;                                      //
  console.log("New PUT of resource "+n);                        //
                                                                //
});                                                             //
app.delete("/api/sandbox/teams/:name", (req,res) => {           //
  var n = req.params.name;                                      //
  var index = teams.indexOf(n);                                 //
  if(index > -1){ //Lo encuentro en "teams"                     //
    teams.splice(index, 1);                                     //
    console.log("New DELETE of resource "+n);                   //
    res.send(teams);                                            //
  } else { //No lo encuentro en "teams"                         //
    console.log("Not DELETE because NOT FOUND "+n);             //
    res.sendStatus(404);                                        //
  }                                                             //
});                                                             //
//////////////////////////////////////////////////////////////////


//Para inicializar la API REST "teams"
// /api-test/XXXXX/loadInitialData“

//app.listen(3000); //Para probar en local
//app.listen(process.env.PORT); //variable entorno para puerto que me dice Heroku
//Hago callback porque es asincrono
app.listen(port, ()=>{
  console.log("Ready to go! port "+port);
});
