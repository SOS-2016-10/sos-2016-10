var express = require("express");
var app = express();

//Initialiting an array to work on. It is Javascript NOT JSON.
var victims = [{autonomous_community: "Andalucia", year: 2015, under18age: 0, from18to40age: 3, over40age: 7},
                {autonomous_community: "Madrid", year: 2013, under18age: 0, from18to40age: 5, over40age: 4},
                {autonomous_community: "Cantabria", year: 2013, under18age: 0, from18to40age: 1, over40age: 0}]

//Function to find the required concrete resource of victims
  function finder(array,name){
    for(var i=0;i<array.length;i++){
  if(array[i].name == name){
        var aux = 0; //OK
          break;
    } else {
        var aux = 1; //Error
      }
    }
    return [aux, i];
    }

//Blue Table Operators

//List of resource
module.exports.getVictims = (req,res)=>{
  console.log("New request of victims");
  res.send(victims);
}

module.exports.postVictims = (req, res)=>{
  var v = req.body;
  var f = finder(victims,v.autonomous_community)[0];
  if(f == 0){ //founded, already exist
    res.sendStatus(409); //Conflict
    console.log("NOT POST because \""+v.autonomous_community+"\" already exist");
  } else {
    victims.push(v);
    console.log("New POST of resource "+v.autonomous_community);
    res.sendStatus(201); //CREATED
  }
}

module.exports.putVictims = (req,res)=>{
  console.log("Put not allowed.");
  res.sendStatus(405);
}

module.exports.deleteVictims = (req,res)=>{
  console.log("Deleting Victims...");
  victims = [];
  res.sendStatus(200); //OK
}

/////////////////////////////////////// CONCRETE OBJECTS
module.exports.getVictim = (req,res)=>{
  var victim = req.params.autonomous_community;
  console.log("New get of resource"+victim);
  i1 = finder(victims, victim)[0];
  i2 = finder(victims, victim)[1];
  if(i2 == 0){
    res.send(victims[i1]);
  }else{
    res.sendStatus(404);
  }
}


//mortal-victims
// Calling mortal-victims resource
//app.get("/api/v1/mortal-victims", mortalVictimsCtl.getVictims);
//app.put("/api/v1/mortal-victims", mortalVictimsCtl.putVictims);
//app.delete("/api/v1/mortal-victims", mortalVictimsCtl.deleteVictims);
//Calling mortal-victims concrete resource
//app.get("/api/v1/mortal-victims/:autonomous-community", mortalVictimsCtl.getVictim);
//app.post("/api/v1/mortal-victims/:autonomous-community", mortalVictimsCtl.postVictim);
//app.put("/api/v1/mortal-victims/:autonomous-community", mortalVictimsCtl.putVictim);
//app.delete("/api/v1/mortal-victims/:autonomous-community", mortalVictimsCtl.deleteVictim);
//initialize mortal-victims test data "/api/v1/mortal-victims/loadInitialData"
//app.get("/api/v1/mortal-victims/loadInitialData", mortalVictimsCtl.loadInitialData);
