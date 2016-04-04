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

//find
module.exports.find = function(array,name){
  var aux2 = []; //Me creo array vacío
  for(var i=0;i<array.length;i++){
    if(array[i][name] == name){
      var error = 0; //No hay error
      aux2.push(array[i]);
    }
  }
  if(aux2.length == 0){
    var error = 1; //Hay error
  }
  return [error, i, aux2];
};
//Buscar recursos
module.exports.find_resource = function(array,name){
  for(var i=0;i<array.length;i++){
    if(array[i].autonomous_community == name){
      //console.log(array[i]);
      var error = 0; //No hay error
      break;
    } else {
      var error = 1; //Hay error
    }
  }
  //return [error, i];
  return {
    v1: error,
    v2: i
  };
};
//Busqueda por comunidad(autonoma)
module.exports.find_community = function(array,name){
  var aux = []; //Me creo array vacío
  for(var i=0;i<array.length;i++){
    if(array[i].autonomous_community == name){
      //console.log(array[i]);
      var error = 0; //No hay error
      //break;
      aux.push(array[i]);
    } //else {
      //var error = 1; //Hay error
    //}
  }
  if(aux.length == 0){
    var error = 1; //Hay error
  }
  //return [error, i, aux];
  return {
    v1: error,
    v2: i,
    v3: aux
  };
};
//Busqueda por año
module.exports.find_year = function(array,year){
  var aux2 = []; //Me creo array vacío
  for(var i=0;i<array.length;i++){
    if(array[i].year == year){
      var error = 0; //No hay error
      aux2.push(array[i]);
    }
  }
  if(aux2.length == 0){
    var error = 1; //Hay error
  }
  //return [error, i, aux2];
  return {
    v1: error,
    v2: i,
    v3: aux2
  };
};

//Busqueda
module.exports.search = function(data,query){
  var aux3 = [];
  var aux4 = [];
  //Hago el BUCLE según el nº de parámetros
  for(var i=0;i<Object.keys(query).length;i++){
    var valor = Object.keys(query)[i];
    if(i == 0){ //////////1ª vez que entro en bucle
      //Recorro array dado
      for(var j=0;j<data.length;j++){
        var v = query[valor]; //obtengo el contenido de la request
        if(data[j][valor] == v){
          var error = 0; //No hay error
          aux3.push(data[j]);
        }
      }
      if(aux3.length == 0){
        var error = 1; //Hay error
      }
    } else { //////////Resto de veces que entro en bucle(aux3 ya está lleno)
      for(var j=0;j<aux3.length;j++){
        var v = query[valor]; //obtengo el contenido de la request
        if(aux3[j][valor] == v){
          var error = 0; //No hay error
          aux4.push(aux3[j]);
        }
      }
      aux3 = aux4;
      if(aux4.length == 0){
        var error = 1; //Hay error
      }
    }
  } //FIN for principal
  if(aux4.length == 0){//Devuelvo 1 cosa u otra
    //res.send(aux3);
    return aux3;
  } else {
    //res.send(aux4);
    return aux4;
  }
};
//Paginacion
module.exports.pagination = function(limit,offset,data){
  var aux = [];
  var cont = 0;
  if(limit < 0 || offset > data.length){
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
