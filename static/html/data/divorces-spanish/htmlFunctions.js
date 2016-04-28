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
  var mge = '{"autonomous_community" =' + ac + ',"year" = ' + year + ', "age_0_18" =' + a1 + ', "age_19_24" =' + a2 + ', "age_25_29" =' + a3 + ', "age_30_34" =' + a4 + '}';

  var request = $.ajax({
    type : "POST",
    url : "/api/v1/divorces-spanish?apikey=juanluw",
    dataType : 'json',
    data : JSON.stringify(mge),
    contentType : 'application/json',
    mimeType : 'application/json',
    data : mge
  });

  reload();
}

//PUT
//para cuando clicke en el boton actualizar
function update(){
  console.warn("LLEGAS o NO");
  var name = $("#name").val();
  console.warn(name);
  var province = $("#province").val();
  var town = $("#town").val();
  var length = $("#length").val();
  var width = $("#width").val();
  var mge = '{"name" =' + name + ',"province" = ' + province + ', "town" =' + town + ', "length" =' + length + ', "width" =' + width + '}';

  var request = $.ajax({
    type : "POST",
    url : "/api/v1/beaches",
    dataType : 'json',
    data : JSON.stringify(mge),
    contentType : 'application/json',
    mimeType : 'application/json',
    data : mge
  });

  //Reload
  reload();
}
