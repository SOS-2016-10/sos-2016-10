/*
-funcion update() no hace request de todos los elementos una vez hecha request para PUT.
-cuando se hace get sobre tabla vacia, checkStatus() no ejecuta correctamente.
*/

var API_URL = "/api/v1/telematic-monitorings";
var table;
var currentButton ="";
var request;
var offset = parseInt(0);
var apikey = "";



$(document).ready(()=>{
  //INICIALIZAMOS TABLA.
  console.log("JQUERY READY!");

  $("#show-data").click(showDataButton);
  $("#add-data").click(addButton);
  $("#deleteall-data").click(deleteAllButton);
  $("#load-initial-data").click(loadInitialDataButton);
  $("#update-data").click(updateButton);
  $("#form-button").click(formButton);
  $("#previous-page").click(previousPage);
  $("#next-page").click(nextPage);
  $("#delete-data").click(deleteButton);

});

function formButton(){
  switch(currentButton){
    case "":
      $("#log").text("Select a button, please.");
      $("#logDiv").show(700);
      $("#data").hide();
      break;
    case "SHOW":
      showFunction();
      break;
    case "LOAD":
      loadInitialData();
      break;
    case "POST":
      post();
      break;
    case "UPDATE":
      update();
      break;
    case "DELETEALL":
      deleteAll();
      break;
    case "DELETE":
      deletee();
      break;
  }
}

function showFunction(){
  //makeRequest(type, apikey, offset, limit, province, year, installed, uninstalled, actived);
  console.log("function showFunction");
  makeRequest("GET", $("#apikey-input").val(), offset, $("#limit").val(), $("#province-input").val(), $("#year-input").val(),
    undefined, undefined, undefined);
  makeTable(request);
  checkStatus(request);
}

function post(){
  //makeRequest(type, apikey, offset, limit, province, year, installed, uninstalled, actived);
  console.log("function post");
  makeRequest("POST", $("#apikey-input").val(), undefined, undefined, $("#province-input").val(), $("#year-input").val(),
    $("#installed-input").val(), $("#uninstalled-input").val(), $("#actived-input").val());
  makeTable(request);
  checkStatus(request);
}

function update(){
  console.log("function update");
  makeRequest("PUT", $("#apikey-input").val(), undefined, undefined, $("#province-input").val(), $("#year-input").val(),
    $("#installed-input").val(), $("#uninstalled-input").val(), $("#actived-input").val());
  //makeTable(request);
  checkStatus(request);
  request.done((data,status,jqXHR)=>{
    console.log("function update - done");
    makeRequest("GET", "read", offset, $("#limit").val(), undefined, undefined,
      undefined, undefined, undefined);
    makeTable(request);
    checkStatus(request);
  });
}

function deleteAll(){
  console.log("function deleteAll");
  makeRequest("DELETEALL", $("#apikey-input").val(), undefined, undefined, undefined, undefined,
    undefined, undefined, undefined);
  makeTable(request);
  checkStatus(request);
}

function detelee(){
  console.log("function delete");
  makeRequest("DELETE", $("#apikey-input").val(), undefined, undefined, $("#province-input").val(), $("#year-input").val(),
    undefined, undefined, undefined);
  checkStatus(request);
  request.done((data,status,jqXHR)=>{
    console.log("function update - done");
    makeRequest("GET", "read", offset, $("#limit").val(), undefined, undefined,
      undefined, undefined, undefined);
    makeTable(request);
    checkStatus(request);
  });
}

function loadInitialData(){
  //makeRequest(type, apikey, offset, limit, province, year, installed, uninstalled, actived);
  console.log("function loadinitialdata");
  makeRequest("GET", $("#apikey-input").val(), undefined, undefined, "loadInitialData", undefined,
    undefined, undefined, undefined);
  makeRequest("GET", "read", offset, $("#limit").val(), undefined, undefined,
      undefined, undefined, undefined);
  makeTable(request);
  checkStatus(request);
  //this.reload();
}

function makeRequest(type, apikey, offset, limit, province, year, installed, uninstalled, actived){
  console.log("function makeRequest.");
  var url = API_URL;

  if(type == "GET"){
    console.log("function makeRequest - GET.");
    if(province != undefined && province.length > 0) url += "/"+province;
    if(year != undefined && year.length > 0) url += "/"+year;
    if(apikey != undefined && apikey.length > 0) url += "?apikey="+apikey;
    if(offset != undefined && offset >= 0) url += "&offset="+offset;
    if(limit != undefined && limit > 0) url += "&limit="+limit;
    console.log("URL: "+url);
    request = $.ajax({
      "type": "GET",
      "url": url,
    });
    request.done(()=>{
      console.log("function makeRequest - GET - done")
      offset += parseInt($("#limit").val());
    });
  }else if(type == "POST"){
    //province and year must be undefined.
    console.log("function makeRequest - POST.");
    if(apikey != undefined && apikey.length > 0) url += "?apikey="+apikey;
    datum = '[{"province":"'+$("#province-input").val()+'", "year":"'+$("#year-input").val()+'", "installed":"'+$("#installed-input").val()+'", "uninstalled":"'+$("#uninstalled-input").val()+'", "actived":"'+$("#actived-input").val()+'"}]';
    request = $.ajax({
      url : url,
      type : "POST",
      data : datum,
      dataType : "json",
      contentType : "application/json",
    });
  }else if(type == "PUT"){
    console.log("function makeRequest - PUT.");
    if(province != undefined && province.length > 0) url += "/"+province;
    if(year != undefined && year.length > 0) url += "/"+year;
    if(apikey != undefined && apikey.length > 0) url += "?apikey="+apikey;
    console.log("function makeRequest - PUT - URL: "+url);
    datum = '[{"province":"'+$("#province-input").val()+'", "year":"'+$("#year-input").val()+'", "installed":"'+$("#installed-input").val()+'", "uninstalled":"'+$("#uninstalled-input").val()+'", "actived":"'+$("#actived-input").val()+'"}]';
    request = $.ajax({
      url : url,
      type : "PUT",
      data : datum,
      dataType : "json",
      contentType : "application/json",
    });
  }else if(type == "DELETEALL"){
    console.log("function makeRequest - DELETEALL.");
    if(apikey != undefined && apikey.length > 0) url += "?apikey="+apikey;
    request = $.ajax({
      url : url,
      type : "DELETE",
      dataType : "json"
    });

  }else if(type == "DELETE"){
    console.log("function makeRequest - DELETE.");
    if(province != undefined && province.length > 0) url += "/"+province;
    if(year != undefined && year.length > 0) url += "/"+year;
    if(apikey != undefined && apikey.length > 0) url += "?apikey="+apikey;
    console.log("function makeRequest - PUT - URL: "+url);
    request = $.ajax({
      url : url,
      type : "DELETE",
      dataType : "json"
    });
  }

}


function makeTable(request){
  console.log("function makeTable(dynatable)");

  request.done((data,status,jqXHR) =>{
    console.log("function makeTable(dynatable) - request.done");

    table = $('#data-table').dynatable({
    dataset: {
      records: data,
    },
    features: {
    paginate: false,
    search: false,
    recordCount: false,
    perPageSelect: false
  }
    }).data('dynatable');

    table.settings.dataset.originalRecords = data;
    //intento de añadir botones de edicion....
    //table.settings.dataset.originalRecords.push({someAttribute: 'hello', anotherAttribute: 'there'});
    table.process();
  });//done
  request.fail(()=>{
    console.log("function makeTable - request.fail");
    table.settings.dataset.originalRecords = [];
    table.process();
  });//fail

}

function checkStatus(request){
  console.log("function checkStatus.");
  request.always((jqXHR,status)=>{
    if(jqXHR.status == 401){
      console.log("function checkStatus - 401");
      $("#log").text("You are UNAUTHORIZED. Type a correct APIKEY");
      $("#logDiv").show(700);
      $("#data").hide();
    } else if(jqXHR.status == 403){
      console.log("function checkStatus - 403");
      $("#log").text("Apikey incorrect.");
      $("#logDiv").show(700);
      $("#data").hide();
    }else if(jqXHR.status == 404){
      console.log("function checkStatus - 404");
      $("#log").text("There are not elements.");
      $("#logDiv").show(700);
      $("#data").hide();
    }else if(jqXHR.status == 409){
      console.log("function checkStatus - 409");
      $("#log").text("There was a CONFLICT with the data.");
      $("#logDiv").show(700);
      $("#data").hide();
    }
  });
}

function reload(){
  location.reload();
}


// BUTTONS

function nextPage(){
  console.log("function nextPage");
  makeRequest("GET", $("#apikey-input").val(), offset + parseInt($("#limit").val()), $("#limit").val(), $("#province-input").val(), $("#year-input").val(),
    undefined, undefined, undefined);
  request.done(()=>{
    console.log("function nextPage - done")
    offset += parseInt($("#limit").val());
  })
  makeTable(request);
  checkStatus(request);
}

function previousPage(){
  console.log("function nextPage");
  var offset2 = offset;
  offset2 -= parseInt($("#limit").val());
  if(offset2 < 0){
    offset2 = parseInt(0);
  }
  makeRequest("GET", $("#apikey-input").val(), offset2, $("#limit").val(), $("#province-input").val(), $("#year-input").val(),
    undefined, undefined, undefined);
  request.done(()=>{
    console.log("function nextPage - done");
    offset -= parseInt($("#limit").val());
    if(offset < 0){offset = parseInt(0);}
  });
  makeTable(request);
  checkStatus(request);
}

function logButton(){
  $("#logDiv").hide();
  $("#data").show(700);
}

function showDataButton(){
  console.log("function showDataButton");
  $('#province-input').attr('disabled', false);
  $('#year-input').attr('disabled', false);
  $('#installed-input').attr('disabled', true);
  $('#uninstalled-input').attr('disabled', true);
  $('#actived-input').attr('disabled', true);
  currentButton = "SHOW";
}


function updateButton(){
  $('#province-input').attr('disabled', false);
  $('#year-input').attr('disabled', false);
  $('#installed-input').attr('disabled', false);
  $('#uninstalled-input').attr('disabled', false);
  $('#actived-input').attr('disabled', false);
  currentButton = "UPDATE";
}

function addButton(){
  $('#province-input').attr('disabled', false);
  $('#year-input').attr('disabled', false);
  $('#installed-input').attr('disabled', false);
  $('#uninstalled-input').attr('disabled', false);
  $('#actived-input').attr('disabled', false);
  currentButton = "POST";
}

function deleteAllButton(){
  $('#province-input').attr('disabled', true);
  $('#year-input').attr('disabled', true);
  $('#installed-input').attr('disabled', true);
  $('#uninstalled-input').attr('disabled', true);
  $('#actived-input').attr('disabled', true);
  currentButton = "DELETEALL";
}

function deleteButton(){
  $('#province-input').attr('disabled', false);
  $('#year-input').attr('disabled', false);
  $('#installed-input').attr('disabled', true);
  $('#uninstalled-input').attr('disabled', true);
  $('#actived-input').attr('disabled', true);
  currentButton = "DELETE";
}

function loadInitialDataButton(){
  $('#province-input').attr('disabled', true);
  $('#year-input').attr('disabled', true);
  $('#installed-input').attr('disabled', true);
  $('#uninstalled-input').attr('disabled', true);
  $('#actived-input').attr('disabled', true);
  currentButton = "LOAD";
}















/*
function checkAndMake(request){
  console.log("function checkAndMake");
  var stat = checkStatus(request);
  console.log("Status: "+stat);
  if(stat == true){
    console.log("function checkAndMake - if stat == true");
    makeTable(request);
  }else{
    console.log("function checkAndMake - if stat == true");
    table.clear();
  }
}
*/


/*
//DATATABLE
function makeTable(request){
  console.log("function makeTable");
  request.done((data,status,jqXHR) =>{
    if( $.fn.dataTable.isDataTable("#data-table") ){
      console.log("function makeTable - request.done --> destroy");
      table.destroy();
    }

    table = $("#data-table").DataTable( {
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
    });//DataTable
    console.log("function makeTable - DATA LEN: "+data.length);
  });//done
  request.fail(()=>{
    console.log("function makeTable - request.fail");
    if(table != undefined){    table.clear().draw();}
  });

}
*/



/*
function makeTable(request){
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
