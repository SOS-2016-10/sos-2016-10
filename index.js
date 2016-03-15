//Inicializar módulos
var express = require("express");
var bodyParser = require("body-parser"); //Transformar JSON a VARIABLES o viceversa

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
var teams = [{ name: "Betis", stadium: "Benito Villamarín"},
{ name: "Sevilla", stadium: "Ramón Sánchez-Pizjuán"}]; //No es JSON(es JavaScript)  //
                                                                //
//Función para buscar en array "teams" en mi caso               //
function find_resource(array,name){                             //
  for(var i=0;i<array.length;i++){                              //
    if(array[i].name == name){                                  //
      //console.log(array[i]);                                  //
      var error = 0; //No hay error                             //
      break;                                                    //
    } else {                                                    //
      var error = 1; //Hay error                                //
    }                                                           //
  }                                                             //
  return [error, i];                                            //
}                                                               //
                                                                //
app.get("/api/sandbox/teams", (req,res) => {                    //
  console.log("New GET of TEAMS");                              //
  res.send(teams);                                              //
});                                                             //
app.post("/api/sandbox/teams", (req,res) => {                   //
  var team = req.body;                                          //
                                                                //
  //comprobar antes que no existe ese "name" ya                 //
  var e = find_resource(teams,team.name)[0];                    //
  if(e == 0){ //No hay error(lo encuentra, ya existe)           //
    res.sendStatus(409); //Conflict                             //
    console.log("NOT POST because \""+team.name+"\" exist");    //
  } else {                                                      //
    teams.push(team);                                           //
    console.log("New POST of resource "+team.name);             //
    res.sendStatus(200);                                        //
  }                                                             //
});                                                             //
//NO PERMITIDO                                                  //
app.put("/api/sandbox/teams", (req,res) => {                    //
  console.log("PUT NOT ALLOWED");                               //
  res.sendStatus(405);                                          //
});                                                             //
app.delete("/api/sandbox/teams", (req,res) => {                 //
  console.log("New DELETE of TEAMS");                           //
  teams.splice(0,teams.length);                                 //
  res.sendStatus(200);                                          //
});                                                             //
                                                                //
// /api/sandbox/teams/betis //////////////////////////////////////
app.get("/api/sandbox/teams/:name", (req,res)=>{                //
  var n = req.params.name;                                      //
  console.log("New GET of resource "+n);                        //
                                                                //
  var e = find_resource(teams,n)[0];                            //
  var i = find_resource(teams,n)[1];                            //
  if(e == 0){ //Error == 0 "NO hay error"                       //
    res.send(teams[i]);                                         //
  } else {                                                      //
    res.sendStatus(404);                                        //
  }                                                             //
});                                                             //
//NO PERMITIDO                                                  //
app.post("/api/sandbox/teams/:name", (req,res) => {             //
  console.log("POST NOT ALLOWED");                              //
  res.sendStatus(405);                                          //
});                                                             //
app.put("/api/sandbox/teams/:name", (req,res) => {              //
  //var n = req.params.name;                                    //
  var n = req.body.name;                                        //
                                                                //
  var e = find_resource(teams,n)[0];                            //
  var i = find_resource(teams,n)[1];                            //
  if(e == 0){ //No hay error(lo encuentra, ya existe)           //
    teams.splice(i, 1); //Elimino objeto                        //
    teams.push(req.body); //Añado objeto                        //
    console.log("New PUT of resource "+n);                      //
    res.sendStatus(200);                                        //
  } else {                                                      //
    console.log("Resource \""+n+"\" NOT exist");                //
    res.sendStatus(404);                                        //
  }                                                             //
});                                                             //
app.delete("/api/sandbox/teams/:name", (req,res) => {           //
  var n = req.params.name;                                      //
                                                                //
  var e = find_resource(teams,n)[0];                            //
  var i = find_resource(teams,n)[1];                            //
  if(e == 0){ //Lo encuentro en "teams"                         //
    teams.splice(i, 1); //delete teams[i];                      //
    console.log("New DELETE of resource "+n);                   //
    res.sendStatus(200);                                        //
  } else { //No lo encuentro en "teams"                         //
    console.log("Not DELETE because NOT FOUND "+n);             //
    res.sendStatus(404);                                        //
  }                                                             //
});                                                             //
//Para inicializar la API REST "teams" ///////////////////////////
// /api-test/XXXXX/loadInitialData“                             //
app.get("/api-test/teams/loadInitialData", (req,res)=>{         //
  console.log("/api-test/teams/loadInitialData");               //
  teams = [
        { name: "Betis", stadium: "Benito Villamarín"},
        { name: "Sevilla", stadium: "Ramón Sánchez-Pizjuán"},
        { name: "Real Madrid", stadium: "Santiago Bernabéu"},
        { name: "Valencia", stadium: "Mestalla"}
  ];                                                            //
  res.send(teams);                                              //
  //res.sendStatus(200);                                        //
});                                                             //
                                                                //
//////////////////////////////////////////////////////////////////

/////////////////////// /api/sandbox/videogames //////////////////////////
var videogames = [{ name: "LeagueOflegends", platform: "Computer"},
{ name: "BloodBorn", platform: "Playstation"}];

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
    teams.push(vg);
    console.log("New POST of resource "+vg.name);
    res.sendStatus(200);
  }
});
//NO PERMITIDO
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
        { name: "LeagueOfLegends", platform: "Computer"},
        { name: "BloodBorn", platform: "PlayStation"},
        { name: "Halo", platform: "Xbox"}
  ];
  res.send(videogames);
});



//app.listen(3000); //Para probar en local
//app.listen(process.env.PORT); //variable entorno para puerto que me dice Heroku
//Hago callback porque es asincrono
app.listen(port, ()=>{
  console.log("Ready to go! port "+port);
});
