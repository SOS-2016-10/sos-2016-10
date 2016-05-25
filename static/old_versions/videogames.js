////////////////////// /api/sandbox/videogames //////////////////////////
var videogames = [{ name: "LeagueOflegends", platform: "Computer", players: "Multiplayer"},
{ name: "BloodBorn", platform: "Playstation", players: "Single"}];

//Function to find the concrete resource given in the array of resource
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
//VideoGames Resource

module.exports.getVideogames = (req,res) => {
  console.log("New GET on VIDEOGAMES");
  res.send(videogames);
}

module.exports.postVideogames = (req,res) => {
  var vg = req.body;
  var e = find_resource(videogames,vg.name)[0];
  if(e == 0){
    res.sendStatus(409);
    console.log("NOT POST because \""+vg.name+"\" already exist");
  } else {
    videogames.push(vg);
    console.log("New POST on resource "+vg.name);
    res.sendStatus(200);
  }
}
//NOT ALLOWED - TABLA AZUL
module.exports.putVideogames = (req,res) => {
  console.log("PUT NOT ALLOWED");
  res.sendStatus(405);
}

module.exports.deleteVideogames = (req,res) => {
  console.log("New DELETE on VIDEOGAMES");
  videogames.splice(0,videogames.length);
  res.sendStatus(200);
}

//Concrete VideoGames resource

module.exports.getVideogame = (req,res)=>{
  var n = req.params.name;
  console.log("New GET of resource "+n);
  var e = find_resource(videogames,n)[0];
  var i = find_resource(videogames,n)[1];
  if(e == 0){
    res.send(videogames[i]);
  } else {
    res.sendStatus(404);
  }
}
//NOT ALLOWED - TABLA AZUL
module.exports.postVideogame = (req,res) => {
  console.log("POST NOT ALLOWED");
  res.sendStatus(405);
}

module.exports.putVideogame = (req,res) => {
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
}
module.exports.deleteVideogame = (req,res) => {
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
}

module.exports.loadInitialData = (req,res)=>{
  console.log("/api-test/videogames/loadInitialData");
  videogames = [
        { name: "LeagueOfLegends", platform: "Computer", players:"Multiplayer"},
        { name: "BloodBorn", platform: "PlayStation", players:"Single"},
        { name: "Halo", platform: "Xbox", players: "Multiplayer"}
  ];
  res.send(videogames);
}
////////////////////////////////////////////////////////////////////////////////
