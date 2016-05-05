//Funcion paginar
function paginar(total){
  var limit = $("#limitt").val();
  var num = Math.ceil(total/limit); //Redondeo por arriba para paginación
  console.log("HOY SI: "+num);
  var cont = 0;
  for(var i=1;i<=num;i++){
    $("#paginas").append("<input id=\"pg"+i+"\" type=\"button\" value=\""+i+"\" onclick=\"create_table('/api/v1/divorces-spanish/?apikey=juanlur&limit="+limit+"&offset="+cont+"')\" />");
    //console.log("<input id=\"pg"+i+"\" type=\"button\" value=\""+i+"\" onclick=\"create_table('/api/v1/divorces-spanish/?apikey=juanlur&limit="+limit+"&offset="+cont+"')\" />");
    cont = parseInt(cont) + parseInt(limit);
  }

}

//Funcion para crear las tablas
function create_table(url){
  var request = $.ajax({
    url : url, //"/api/v1/divorces-spanish/?apikey="+$("#apikey").val()+"&limit="+limit+"&offset=5",
    type : "GET"
  });
  this.keyOK(request); //CREO
  request.done((data,status,jqXHR)=>{
    var table = $("#columns").DataTable( {
      destroy: true,
      ordering: false,
      paging: false,
      searching: false,
      data: data,
      "columns": [
        { data: "autonomous_community" },
        { data: "year"},
        { data: "age_0_18"},
        { data: "age_19_24"},
        { data: "age_25_29"},
        { data: "age_30_34"}
      ]
    });
  }); //fin request.done
}

//Función para hacer Reload
function reload(){
  location.reload();
}

//Funcion para mostrar formulario Añadir (POST)
function mostrar(){
  document.getElementById('oculto').style.display = 'block';
}

//Funcion mostrar formulario Update (PUT)
function mostrarUpdate(){
  document.getElementById('ocultoUpdate').style.display = 'block';
}

//Funcion mostrar botones NEXT y LAST para paginacion
function mostrarLastNext(){
  document.getElementById('paginas').style.display = 'block';
}

//Funcion para validar apikey
function keyOK(request){
  request.always((jqXHR,status)=>{
    if(jqXHR.status == 403){
      alert("You can not modify data, because you don not have permission\nCHANGE the apikey or DATA");
    } else if(jqXHR.status == 409){
      alert("CONFLICT exist data yet\n You should add other AUTONOMOUS-COMMUNITY or YEAR");
    } else if(jqXHR.status == 401){
      alert("UNAUTHORIZED, you should change the apikey");
    }
  });
}

//loadInitialData
function loadInitialData(){
  var request= $.ajax({
    type: "GET",
    url : "/api/v1/divorces-spanish/loadInitialData?apikey="+$("#apikey").val(),  //url:"/api/v1/divorces-spanish/loadInitialData?apikey=juanluw"
  });
  this.keyOK(request);
  this.reload();
}
//POST
//cuando clickas en el boton Añadir del formulario
function post(){
  var ac = $("#autonomous-community").val(); //Con guion pk así es ID en html
  var year = $("#year").val();
  var a1 = $("#age_0_18").val();
  var a2 = $("#age_19_24").val();
  var a3 = $("#age_25_29").val();
  var a4 = $("#age_30_34").val();
  var mge = "";
  mge += '{"autonomous_community":\"' + ac + '\","year":' + year + ', "age_0_18":' + a1 + ', "age_19_24":' + a2 + ', "age_25_29":' + a3 + ', "age_30_34":' + a4 + '}';
  console.log("Mensaje para POST: "+mge);

  var request = $.ajax({
    url : "/api/v1/divorces-spanish?apikey="+$("#apikey").val(), //url : "/api/v1/divorces-spanish/?apikey=juanluw",
    type : "POST",
    data : mge,
    dataType : "json",
    contentType : "application/json",
  });
  this.keyOK(request);
}


//function searchByYear
function searchByYear(){
  var year = $("#yearS").val();
  console.log(year);
  if(year.length == 0){ ///// Search vacío(NO SEARCH) ////////
    this.create_table('/api/v1/divorces-spanish?apikey=juanlur');
    /*var request= $.ajax({
      type: "GET",
      url:"/api/v1/divorces-spanish?apikey=juanlur"
    });

    request.done((data,status,jqXHR)=>{
      //$(document).ready( function () { ////
      var table = $("#columns").DataTable( {
        destroy: true,
        ordering: false,
        paging: false,
        searching: false,
        data: data,
        "columns": [
          { data: "autonomous_community" },
          { data: "year"},
          { data: "age_0_18"},
          { data: "age_19_24"},
          { data: "age_25_29"},
          { data: "age_30_34"}
        ]
      });
    });*/
  } else { ////////////////// HAY SEARCH //////////////////////
    var key = $("#apikey").val();
    var url = "/api/v1/divorces-spanish/?apikey="+key+"&year="+year;
    console.log(url);
    this.create_table(url);
    /*var request = $.ajax({
      url : "/api/v1/divorces-spanish/?apikey="+$("#apikey").val()+"&year="+year,
      type : "GET"
    });

    this.keyOK(request);

    request.done((data,status,jqXHR)=>{
      $("#columns").DataTable( {
        destroy: true,
        ordering: false,
        paging: false,
        searching: false,
        data: data,
        "columns": [
          { data: "autonomous_community" },
          { data: "year"},
          { data: "age_0_18"},
          { data: "age_19_24"},
          { data: "age_25_29"},
          { data: "age_30_34"}
        ]
      });
    });*/
  } //fin else

}
