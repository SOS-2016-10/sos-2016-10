//Pagination
/*function pagination(limit,offset,data){
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
}*/

//find_community
/*function find_community(array,name){
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
  return [error, i, aux];
}

//find_year
function find_year(array,year){
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
  return [error, i, aux2];
}*/

/*//Función para buscar en array "divorces" en mi caso
function find_resource(array,name){
  for(var i=0;i<array.length;i++){
    if(array[i].autonomous_community == name){
      //console.log(array[i]);
      var error = 0; //No hay error
      break;
    } else {
      var error = 1; //Hay error
    }
  }
  return [error, i];
}*/
//divorces.splice(0,divorces.length);
//Delete ALL
module.exports.deleteAll = function(data){
  data.splice(0,data.length);
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
  return [error, i];
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
  return [error, i, aux];
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
  return [error, i, aux2];
};
/*var aux3 = [];
var aux4 = [];
//Hago el BUCLE según el nº de parámetros
for(var i=0;i<Object.keys(req.query).length;i++){
  var valor = Object.keys(req.query)[i];

  if(i == 0){ //////////1ª vez que entro en bucle
    //Recorro array dado
    for(var j=0;j<divorces.length;j++){
      var v = req.query[valor]; //obtengo el contenido de la request
      if(divorces[j][valor] == v){
        var error = 0; //No hay error
        aux3.push(divorces[j]);
      }
    }
    if(aux3.length == 0){
      var error = 1; //Hay error
    }
  } else { //////////Resto de veces que entro en bucle(aux3 ya está lleno)
    for(var j=0;j<aux3.length;j++){
      var v = req.query[valor]; //obtengo el contenido de la request
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
  res.send(aux3);
} else {
  res.send(aux4);
}*/
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
