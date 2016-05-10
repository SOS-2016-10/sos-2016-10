
function showDataButton(){
  $('#add-hidden').hide(200);
  $('#update-hidden').hide(200);
  $('#delete-hidden').hide(200);
  $('#show-data-hidden').toggle(700);
}


function updateButton(){
  $('#add-hidden').hide(200);
  $('#show-data-hidden').hide(200);
  $('#delete-hidden').hide(200);
  $('#update-hidden').toggle(700);
}

function addButton(){
  $('#show-data-hidden').hide(200);
  $('#update-hidden').hide(200);
  $('#delete-hidden').hide(200);
    $('#add-hidden').toggle(700);
}

function deleteButton(){
  $('#add-hidden').hide(200);
  $('#update-hidden').hide(200);
  $('#show-data-hidden').hide(200);
    $('#delete-hidden').toggle(700);
}

function showFunction(){
  var url = "/api/v1/telematic-monitorings/";
  console.log("URL GET sin campos: "+url);
  var province = $("#show-province").val();
  var year = $("#show-year").val();
  var apikey = $("#apikey-show").val();
  if(province.length > 0){ url +=province+"/";}
  if(year.length > 0){ url +=year+"/";}
  url +="?apikey="+apikey;
  var request = $.ajax({
    type: "GET",
    url: url,
  });
  alert(url);
  console.log("URL GET con campos: "+url);
  makeTable(request);
  $("#data").show(700);
}

function makeTable(request){
  alert("MAKE TABLE");
  console.log("MAKE TABLE")
  request.done((data,status,jqXHR) =>{
    alert("DATA LEN1: "+data.length);
    var table = $("#columns").DataTable( {
      ordering: false,
      paging: false,
      searching: false,
      data: data,
      "columns": [
        { data: "province" },
        { data: "year"},
        { data: "installed"},
        { data: "uninstalled"},
        { data: "actived"}]
    });
  });
  alert("DATA LEN1: "+data.length);
}



/*
function makeTable(request){
  alert("MAKE TABLE");
  console.log("MAKE TABLE")
  request.done((data,status,jqXHR) =>{

    var table = $('<table id="data-table"  class="responsive-table highlight">'); //Inicializo tabla
    var head = "<tr>";
    for (var i in data[0]){
      head = head + ("<th>"+i+"</th>");
    }
    head = head + "<tr>";
    $(head).appendTo(table);
    $.each(data, function(index, value){
      var row = "<tr>";
      $.each(value, function(key,val){
        row = row + ("<td>"+val+"</td>");
      });
      row = row + "</tr>";
      $(table).append(row);
    });
    //return ($(table));

    $(table).appendTo("#data");

  });
}
*/














//Función para hacer Reload
function reload(){
  location.reload();
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
