/////// URI:/api/sandbox/unions
var unions = [{acronym:"CGT",name:"Confederacion general del trabajo"}];

function search(array, acronym){
  for(var i = 0;i<array.length;i++){
    if(array[i].acronym == acronym){
      return i;
    }
  }
  return -1;
}
///

module.exports.getUnions = (req,res)=>{
  console.log("New request of unions.");
  res.send(unions);
}

module.exports.postUnions = (req, res)=>{
  var sind = req.body;
  if(unions.indexOf(sind)==-1){
    unions.push(sind);
    res.sendStatus(200);
    console.log("New post of resource: "+sind.acronym);
  }else{
    res.sendStatus(406);
    console.log("New post of already exiting labor unions: "+sind.acronym);
  }
}

module.exports.putUnions = (req,res)=>{
  console.log("Put not allowed.");
  res.sendStatus(405);
}

module.exports.deleteUnions = (req,res)=>{
  console.log("Deleting unions.");
  unions = [];
  res.sendStatus(200);
}

/////////////////////////////////////// CONCRETE OBJECTS
module.exports.getUnion = (req,res)=>{
  var s = req.params.acronym;
  console.log("New get of "+s);
  index = search(unions, s);
  if(index == -1){
    res.sendStatus(404);
  }else{
    res.send(unions[index]);
  }
}

module.exports.postUnion = (req,res)=>{
  res.sendStatus(405);
  console.log("Post not allowed.")
}

module.exports.putUnion = (req,res)=>{
  var s = req.params.acronym;
  console.log("New put of "+s);
  index = search(unions, s);
  if(index == -1){
    res.sendStatus(404);
  }else{
    unions[index] = req.body;
    res.sendStatus(200);
  }
}

module.exports.deleteUnion = (req,res)=>{
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
}

module.exports.loadInitialData = (req,res)=>{
  u1 = {acronym:"TUC",name:"Trade union congress"};
  u2 = {acronym:"LTC",name:"London trades council"};
  unions.push(u1);
  unions.push(u2);
  res.sendStatus(200);
}
//end of /api/sandbox/unions
