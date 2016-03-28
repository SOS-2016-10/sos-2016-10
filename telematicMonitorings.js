// URI:/api/v1/telematic-monitorings
var tms = [{province:"Sevilla",year:2013,installed:22,uninstalled:23,actived:27}];

function search(array, province){
  for(var i = 0;i<array.length;i++){
    if(array[i].province == province){
      return i;
    }
  }
  return -1;
}

module.exports.getTMs = (req,res)=>{
  console.log("New request of TMs.");
  res.send(tms);
});

module.exports.postTMs = (req, res)=>{
  var tm = req.body;
  if(tms.indexOf(tm)==-1){
    tms.push(tm);
    res.sendStatus(200);
    console.log("New post of resource: "+tm.province);
  }else{
    res.sendStatus(406);
    console.log("New post of already exiting TM: "+tm.province);
  }
});

module.exports.putTMs = (req,res)=>{
  console.log("Put not allowed.");
  res.sendStatus(405);
});

module.exports.deleteTMs = (req,res)=>{
  console.log("Deleting TMs.");
  tms = [];
  res.sendStatus(200);
});

/////////////////////////////////////// CONCRETE OBJECTS
module.exports.getTM = (req,res)=>{
  var s = req.params.province;
  console.log("New get of "+s);
  index = search(tms, s);
  if(index == -1){
    res.sendStatus(404);
  }else{
    res.send(tms[index]);
  }
});

module.exports.postTM = (req,res)=>{
  res.sendStatus(405);
  console.log("Post not allowed.")
});

module.exports.putTM = (req,res)=>{
  var s = req.params.province;
  console.log("New put of "+s);
  index = search(tms, s);
  if(index == -1){
    res.sendStatus(404);
  }else{
    tms[index] = req.body;
    res.sendStatus(200);
  }
});

module.exports.deleteTM = (req,res)=>{
  var s = req.params.province;
  index = search(tms, s);
  if(index == -1){
    var s = req.params.siglas;
    console.log("Can not be delete "+s);
    res.sendStatus(404);
  }else{
    console.log("New delete of "+s);
    tms.splice(index,1);
    res.sendStatus(200);
  }
});

module.exports.loadInitialData = (req,res)=>{
  tm1 = {province:"Sevilla",year:2013,installed:1,uninstalled:2,actived:3}
  tm2 = {province:"Madrid",year:2013,installed:4,uninstalled:5,actived:6}
  tm3 = {province:"Málaga",year:2013,installed:7,uninstalled:8,actived:9}
  tm4 = {province:"Granada",year:2013,installed:10,uninstalled:11,actived:12}
  tm5 = {province:"Zaragoza",year:2013,installed:13,uninstalled:14,actived:15}
  tms.push(tm1);
  tms.push(tm2);
  tms.push(tm3);
  tms.push(tm4);
  tms.push(tm5);
  res.sendStatus(200);
});
