//Delete ALL
module.exports.deleteAll = function(data){
  data.splice(0,data.length);
};
//Delete by param "community_autonomous" or "year"
module.exports.deleteParam = function(data,param,prop){
  var aux = data.slice(); //copio array
  var cont = 0;
  for(var i=0;i<data.length;i++){
    if(data[i][prop] == param){//data[i].year or data[i].autonomous_community
      var ind = i-cont; //Como array va disminuyendo, tengo que calcular indice
      aux.splice(ind,1);//aux.splice((i-cont), 1); //delete divorces[i]; //data.splice(i,1);   //aplice(i,x)=>en la posicion "i" borra "x" elementos
      cont++;
    }
  }
  return aux;
};
module.exports.deleteOneResource = function(data,ac,y){
  for(var i=0;i<data.length;i++){
    if((data[i].autonomous_community == ac) && (data[i].year == y)){
      data.splice(i,1);
      break;
    }
  }
};

//Busqueda por comunidad(autonoma)
module.exports.find_community = function(array,name){
  var aux = []; //Me creo array vacío
  for(var i=0;i<array.length;i++){
    if(array[i].autonomous_community == name){
      aux.push(array[i]);
    }
  }
  return aux;
};
//Busqueda por año
module.exports.find_year = function(array,year){
  var aux2 = []; //Me creo array vacío
  for(var i=0;i<array.length;i++){
    if(array[i].year == year){
      aux2.push(array[i]);
    }
  }
  return aux2;
};
//Busqueda FROM_TO
module.exports.find_fromTO = function(from,to,array){
  var aux = [];
  for(var i=from;i<=to;i++){ //AÑOS(2012,2013,.....)
    for(var j=0;j<array.length;j++){
      if(array[j].year == i){
        aux.push(array[j]);
      }
    }
  }
  return aux;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Busqueda
module.exports.search = function(data,query){
  var aux = [];

  for(var i=0;i<Object.keys(query).length;i++){
    var valor = Object.keys(query)[i];
    if((valor == "limit") || (valor == "offset") || (valor == "from") || (valor == "to")){
      continue;
    } else {
      //Recorro array dado
      for(var j=0;j<data.length;j++){
        var v = query[valor]; //obtengo el contenido de la request
        if(data[j][valor] == v){ //data[0].year == 2014
          aux.push(data[j]);
        }
      }
    }
  }
  if((query.from != undefined) && (query.to != undefined)) { //Search FROM and TO
    if((Object.keys(query).length == 3) || ((Object.keys(query).length == 5) && (query.limit != undefined) && (query.offset != undefined))){ //Only FROM and TO
      aux = this.find_fromTO(query.from,query.to,data);
    } else {
      aux = this.find_fromTO(query.from,query.to,aux);
    }
  }
  return aux;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Paginacion
module.exports.pagination = function(limit,offset,data){
  var aux = [];
  var cont = 0;
  if((limit<0) || (offset>data.length)){
    aux = 400; //BAD REQUEST
  } else if(limit >= 0){
    for(var i=offset;i<data.length;i++){
      aux.push(data[i]);
      cont++;
      if(cont == limit){
        break; //Me salgo del bucle
      }
    }
  }
  return aux;
};
