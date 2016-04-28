//Función para hacer Reload
function reload(){
  location.reload();
}

//Funcion para mostrar formulario Añadir (POST)
function mostrar(){
  document.getElementById('oculto').style.display = 'block';
}

//funcion mostrar formulario Update (PUT)
function mostrarUpdate(){
  document.getElementById('ocultoUpdate').style.display = 'block';
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
  var mge = '{"autonomous_community":\"' + ac + '\","year":' + year + ', "age_0_18":' + a1 + ', "age_19_24":' + a2 + ', "age_25_29":' + a3 + ', "age_30_34":' + a4 + '}';
  console.log("Mensaje para POST: "+mge);
  var request = $.ajax({
    url : "/api/v1/divorces-spanish?apikey=juanluw",
    type : "POST",
    data : mge,//JSON.stringify(mge),
    dataType : 'json',
    contentType : 'application/json'
  });
}
