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


//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// /api/sandbox/videogames ////////////////////////////////////////////////////
//var contacts = [{ name : "pepe"}];                                         //
var videogames = [{ name : "games"}];                                        //
app.get("/api/sandbox/videogames", (req,res) => {                            //
  console.log("New GET of videogames");                                      //
  res.send(videogames);                                                      //
});                                                                          //
app.post("/api/sandbox/videogames", (req,res) => {                           //
  var videogame = req.body;
  index = searchV(videogames, videogame.name);                                             //
  if(index == -1){
    res.sendStatus(406);                                                     //
    console.log("New post of already existing videogame: "+videogame.name);                                        //                   //
  }else{                                                                     //
    videogames.push(videogame);                                              //
    res.sendStatus(200);                                                     //
    console.log("New post of resource: "+videogame.name);   //
  }                                                                          //
});                                                                          //
//NO PERMITIDO                                                               //
app.put("/api/sandbox/videogames", (req,res) => {                            //
  console.log("PUT NOT ALLOWED");                                            //
  res.sendStatus(405);                                                       //
});                                                                          //
app.delete("/api/sandbox/videogames", (req,res) => {                         //
  console.log("New DELETE of videogames");                                   //
  videogames.splice(0,videogames.length);                                    //
  res.sendStatus(200);                                                       //
});                                                                          //
                                                                             //
// /api/sandbox/videogames/LOL ////////////////////////////////////////////////
app.get("/api/sandbox/videogames/:name", (req,res)=>{                        //
  var n = req.params.name;                                                   //
  console.log("New get of "+n);                                              //
  index = searchV(videogames, n);                                            //
  if(index == -1){                                                           //
    res.sendstatus(404);                                                     //
  }else{                                                                     //
    res.send(videogames[index]);                                             //
  }                                                                          //
});                                                                          //
//NO PERMITIDO                                                               //
app.post("/api/sandbox/videogames/:name", (req,res) => {                     //
  console.log("POST NOT ALLOWED");                                           //
  res.sendStatus(405);                                                       //
});                                                                          //
app.put("/api/sandbox/videogames/:name", (req,res) => {                      //
  var n = req.params.name;                                                   //
  console.log("Trying to update "+n);                                        //
  index = search(videogames, n);                                             //
  if(index == -1){                                                           //
    res.sendstatus(404);                                                     //
  }else{                                                                     //
    videogames[index] = req.body;                                            //
    res.sendstatus(200);                                                     //
  }                                                                          //
});                                                                          //
app.delete("/api/sandbox/videogames/:name", (req,res) => {                   //
  var n = req.params.name;                                                   //
  index = searchV(videogames, n);                                            //
  if(index == -1){                                                           //
    var n1 = req.params.name;                                                //
    console.log(n1+" can not be deleted ");                                  //
    res.sendstatus(404);                                                     //
  }else{                                                                     //
    console.log("New delete of "+n);                                         //
    unions.splice(index,1);                                                  //
    res.sendstatus(200);                                                     //
  }                                                                          //
});                                                                          //
//FUNCTIONS                                                                  //
function searchV(array, name){                                               //
  for(var i = 0;i<array.length;i++){                                         //
    if(array[i].name == name){                                               //
      return i;                                                              //
    }                                                                        //
  }                                                                          //
  return -1;                                                                 //
}                                                                            //
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// /api/sandbox/unions

var unions = [{acronym:"CGT",name:"Confederacion general del trabajo"}];

app.get("/api/sandbox/unions", (req,res)=>{
  console.log("New request of unions.");
  res.send(unions);
});

app.post("/api/sandbox/unions", (req, res)=>{
  var sind = req.body;
  if(!unions.indexOf(sind)){
    unions.push(sind);
    res.sendStatus(200);
    console.log("New post of resource: "+sind.siglas);
  }else{
    res.sendStatus(406);
    console.log("New post of already exiting labor unions: "+sind.siglas);
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



//Para inicializar la API REST "teams"
// /api-test/XXXXX/loadInitialData“

//app.listen(3000); //Para probar en local
//app.listen(process.env.PORT); //variable entorno para puerto que me dice Heroku
//Hago callback porque es asincrono
app.listen(port, ()=>{
  console.log("Ready to go! port "+port);
});
