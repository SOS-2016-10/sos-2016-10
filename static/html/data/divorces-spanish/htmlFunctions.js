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

//Funcion para validar apikey
function keyOK(request){
  request.always((jqXHR,status)=>{
    if(jqXHR.status == 403){
      alert("You can not modify data, because you don not have permission\nCHANGE the apikey");
    } else if(jqXHR.status == 409){
      alert("CONFLICT exist data yet");
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
  request.always((jqXHR,status)=>{
    if(jqXHR.status == 409){
      alert("NO \"Load Initial Data\" because exist data yet");
    } else if(jqXHR.status == 403){
      alert("You can not modify data, because you don not have permission\nCHANGE the apikey");
    } else if(jqXHR.status == 401){
      alert("UNAUTHORIZED, you should change the apikey");
    } else {
      this.reload();
    }
  });
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
  request.always((jqXHR,status)=>{
    if(jqXHR.status == 409){
      alert("CONFLICT, You should add other AUTONOMOUS-COMMUNITY or YEAR");
    } else if(jqXHR.status == 403){
      alert("You can not modify data, because you don not have permission\nCHANGE the apikey");
    } else if(jqXHR.status == 401){
      alert("UNAUTHORIZED, you should change the apikey");
    }
  });
}
