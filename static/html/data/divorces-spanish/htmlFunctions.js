$(document).ready(function (){

  var request= $.ajax({
    url: "/api/v1/divorces-spanish?apikey=multiPlan_C4_sos-2016-10-jldl_ag&limit=5&offset=0", //"/api/v1/divorces-spanish?apikey=juanlur",
  });
  request.done((data,status,jqXHR)=>{
    var table = $("#columns").DataTable( {
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


    //**** Seleccionar una fila ****
    $('#columns tbody').on( 'click', 'tr', function () {
      if ( $(this).hasClass('selected') ) { //Si está en Clase "selected"
        $(this).removeClass('selected'); //entonces lo quito de "selected"
      } else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected'); //Añado a la clase "selected"
      }
    });

    //Eliminar todo
    $('#DELETE_ALL').on( 'click', function () {
      //table.row('.selected').remove().draw( false );
      var row = table.row('.selected');
      var request = $.ajax({
        url : "/api/v1/divorces-spanish?apikey="+$("#apikey").val(),   //url : "/api/v1/divorces-spanish?apikey=juanluw",
        type : "delete",
        dataType : "json"
      });
      keyOK(request);
      location.reload(); //Reload
    });

    // ***** Eliminar 1 Fila *****
    $('#DELETE').click( function () {
      var row = table.rows('.selected').data();
      //console.log("ELIMINO 1 FILA: "+row[0].autonomous_community);
      console.log("ELIMINO 1 FILA: "+row.length);
      if(row.length == 0){
        alert("You should select 1 row to DELETE");
      } else {
        for(var i=0;i<row.length;i++){
          var request = $.ajax({
            url : "/api/v1/divorces-spanish/"+ row[i].autonomous_community +"?apikey="+$("#apikey").val(), //url : "/api/v1/divorces-spanish/" + row[i].autonomous_community + "?apikey=juanluw",
            type : "delete",
            dataType : "json"
          });
          keyOK(request);
        }
      }
    });

    ////POST
    $("#sendPost").click( function(){
      var ac = $("#autonomous-community").val(); //Con guion pk así es ID en html
      var year = $("#year").val();
      var a1 = $("#age_0_18").val();
      var a2 = $("#age_19_24").val();
      var a3 = $("#age_25_29").val();
      var a4 = $("#age_30_34").val();
      var mge = "";
      mge += '{"autonomous_community":\"' + ac + '\","year":' + year + ', "age_0_18":' + a1 + ', "age_19_24":' + a2 + ', "age_25_29":' + a3 + ', "age_30_34":' + a4 + '}';
      //console.log("Mensaje para POST: "+mge);

      var request = $.ajax({
        url : "/api/v1/divorces-spanish?apikey="+$("#apikey").val(), //url : "/api/v1/divorces-spanish/?apikey=juanluw",
        type : "POST",
        data : mge,
        dataType : "json",
        contentType : "application/json",
        async: false //MUY IMPORTANTE para ver ALERT
      });
      keyOK(request);
    }); //fin POST

    ////UPDATE
    $("#button_update").click( function () {
      var row = table.rows('.selected').data();
      if(row.length == 0){
        alert("You should select 1 row to UPDATE");
      } else {
        var datos = "";
        datos += '{"autonomous_community":'; //1º campo lo cojo del objeto,pk es "key" y no puede modificarse
        datos += '"';
        datos += row[0].autonomous_community;
        datos += '"';
        datos += ',';
        datos += '"year":';
        datos += $("#yearU").val();
        datos += ',';
        datos += '"age_0_18":';
        datos += $("#age_0_18U").val();
        datos += ',';
        datos += '"age_19_24":';
        datos += $("#age_19_24U").val();
        datos += ',';
        datos += '"age_25_29":';
        datos += $("#age_25_29U").val();
        datos += ',';
        datos += '"age_30_34":';
        datos += $("#age_30_34U").val();
        datos += '}';
        console.log("TOMA UPDATE: "+datos);
        var request = $.ajax({
          url : "/api/v1/divorces-spanish/"+row[0].autonomous_community+"?apikey="+$("#apikey").val(), //url : "/api/v1/divorces-spanish/"+row[0].autonomous_community+"?apikey=juanluw",
          type : "PUT",
          data : datos,
          dataType : "json",
          contentType : "application/json",
          async: false //MUY IMPORTANTE para ver ALERT
        });
        keyOK(request);
      }
    } );  ////finUPDATE


  }); //Fin request.done
}); //Fin ready


function previous(){
    new_page = parseInt($('#current_page').val()) - 1;
    console.log("PAGINA YA antes: "+new_page);
    //if there is an item before the current active link run the function
    if($('.active_page').prev('.page_link').length==true){
        this.go_to_page(new_page);
    }
}

function next(){
    new_page = parseInt($('#current_page').val()) + 1;
    console.log("PAGINA YA siguiente: "+new_page);
    //if there is an item after the current active link run the function
    if($('.active_page').next('.page_link').length==true){
        this.go_to_page(new_page);
    }
}
function go_to_page(page_num){
    //get the number of items shown per page
    var show_per_page = parseInt($('#limitt').val());//parseInt($('#show_per_page').val());

    //get the element number where to start the slice from
    start_from = page_num * show_per_page;

    //get the element number where to end the slice
    //end_on = start_from + show_per_page;

    //hide all children elements of content div, get specific items and show them
    //$('#content').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
    ////var url = "/api/v1/divorces-spanish?apikey=multiPlan_C4_sos-2016-10-jldl_ag&limit="+show_per_page+"&offset="+start_from;
    var key = $("#apikey").val();
    var year = $("#yearS").val();
    if(year.length == 0){ //NO BUSQUEDA
      var urlGo = "/api/v1/divorces-spanish?apikey="+key+"&limit="+show_per_page+"&offset="+start_from;
    } else { //SI BUSQUEDA
      var urlGo = "/api/v1/divorces-spanish/"+year+"?apikey="+key+"&limit="+show_per_page+"&offset="+start_from;
    }
    this.create_table(urlGo);

    /*get the page link that has longdesc attribute of the current page and add active_page class to it
    and remove that class from previously active page link*/
    $('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');

    //update the current page input field
    $('#current_page').val(page_num);
}





//Funcion auxiliar
//Funcion numeroFilas
function numRow(){
  var row = table.rows('.selected').data();
  if(row.length == 0){
    alert("You should select 1 row to UPDATE");
  }
}

//Funcion para crear las tablas
function create_table(url){
  var request = $.ajax({
    url : url, //"/api/v1/divorces-spanish/?apikey="+$("#apikey").val()+"&limit="+limit+"&offset=5",
  });
  //this.keyOK(request); //CREO
  request.done((data,status,jqXHR)=>{
    //this.paginar(data.length); //Para hacer paginación
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

//Funcion para validar apikey
function keyOK(request){
  request.always((jqXHR,status)=>{
    if(jqXHR.status == 401){
      alert("UNAUTHORIZED, you should change the apikey");
    } else if(jqXHR.status == 402){
      alert("You SHOULD change apikey, is incorrect");
    } else if(jqXHR.status == 403){
      alert("You can not modify data, because you don not have permission\nCHANGE the apikey or DATA");
    } else if(jqXHR.status == 409){
      alert("CONFLICT exist data yet\n You should add other AUTONOMOUS-COMMUNITY or YEAR");
    } else if(jqXHR.status == 429){
      alert("You SHOULD pay other time");
    }
  });
}

//loadInitialData
function loadInitialData(){
  var request= $.ajax({
    url : "/api/v1/divorces-spanish/loadInitialData?apikey="+$("#apikey").val(),  //url:"/api/v1/divorces-spanish/loadInitialData?apikey=juanluw"
  });
  request.always((jqXHR,status)=>{
    if(jqXHR.status == 409){
      alert("CONFLICT exist data yet\n You should add other AUTONOMOUS-COMMUNITY or YEAR");
    } else {
      this.reload();
    }
  });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function search(){
  $(document).ready(function (){
    var year = $("#yearS").val();
    console.log(year);
    var show_per_page = parseInt($('#limitt').val());
    //NO BUSQUEDA(relleno con lo que hay por defecto)
    if(year.length == 0){ ///// Search vacío(NO SEARCH) ////////
      var key = $("#apikey").val();
      var urlSearch = "/api/v1/divorces-spanish?apikey="+key; //Para crear paginacion
      var url = "/api/v1/divorces-spanish?apikey="+key+"&limit="+show_per_page+"&offset=0";//Para crear datatable
    } else { ////////////////// HAY SEARCH //////////////////////
      var key = $("#apikey").val();
      var urlSearch = "/api/v1/divorces-spanish/"+year+"?apikey="+key; //Para crear paginacion
      var url = "/api/v1/divorces-spanish/"+year+"?apikey="+key+"&limit="+show_per_page+"&offset=0";//Para crear datatable
      //console.log("URL: "+url);
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //how much items per page to show
    ////var show_per_page = parseInt($('#limitt').val());

    //getting the amount of elements inside content div
    var number_of_items;
    var number_of_pages;
    var request = $.ajax({
      url: urlSearch //url: "/api/v1/divorces-spanish?apikey=multiPlan_C4_sos-2016-10-jldl_ag"
    });
    //this.keyOK(request); ///
    request.done((data,status,jqXHR)=>{
      number_of_items = data.length;
      //calculate the number of pages we are going to have
      number_of_pages = Math.ceil(number_of_items/show_per_page);
      //console.log("NUMERO DE JUANLU: "+number_of_pages);
    });
    request.always((jqXHR,status)=>{
      /*console.log("NUMERO DE JUANLU: "+show_per_page);
      console.log("NUMERO DE JUANLU: "+number_of_items);
      console.log("NUMERO DE JUANLU: "+number_of_pages);*/

      //set the value of our hidden input fields
      $('#current_page').val(0);

      var navigation_html = '<a class="previous_link btn btn-warning" href="javascript:previous();">Prev</a>'; //Add btn "Prev"
      var current_link = 0;
      while(number_of_pages > current_link){
          //console.log('<a class="page_link btn btn-warning" href="javascript:go_to_page(' + current_link +')" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>');
          navigation_html += '<a class="page_link btn btn-warning" href="javascript:go_to_page(' + current_link +')" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>';
          current_link++;
      }
      navigation_html += '<a class="next_link btn btn-warning" href="javascript:next();">Next</a>'; //Add btn "Next"
      //console.log(navigation_html);
      $('#page_navigation').html(navigation_html);

      //add active_page class to the first page link
      $('#page_navigation .page_link:first').addClass('active_page');
    });





    //and show the first n (show_per_page) elements
    //$('#content').children().slice(0, show_per_page).css('display', 'block');
    ////var url = "/api/v1/divorces-spanish?apikey=multiPlan_C4_sos-2016-10-jldl_ag&limit="+show_per_page+"&offset=0";
    //var url = "/api/v1/divorces-spanish?apikey=multiPlan_C4_sos-2016-10-jldl_ag&limit="+show_per_page+"&offset=0";
    var request = $.ajax({
      url: url
    });
    //this.keyOK(request); ///
    request.done((data,status,jqXHR)=>{
      var table = $("#columns").DataTable( {
        destroy: true,
        ordering: false,
        paging: false,
        searching: false,
        //async: false,
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


      //**** Seleccionar una fila ****
      /*$('#columns tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) { //Si está en Clase "selected"
          $(this).removeClass('selected'); //entonces lo quito de "selected"
        } else {
          table.$('tr.selected').removeClass('selected');
          $(this).addClass('selected'); //Añado a la clase "selected"
        }
      });

      //Eliminar todo
      $('#DELETE_ALL').on( 'click', function () {
        //table.row('.selected').remove().draw( false );
        var row = table.row('.selected');
        var request = $.ajax({
          url : "/api/v1/divorces-spanish?apikey="+$("#apikey").val(),   //url : "/api/v1/divorces-spanish?apikey=juanluw",
          type : "delete",
          dataType : "json"
        });
        keyOK(request);
        location.reload(); //Reload
      });

      // ***** Eliminar 1 Fila *****
      $('#DELETE').click( function () {
        var row = table.rows('.selected').data();
        //console.log("ELIMINO 1 FILA: "+row[0].autonomous_community);
        console.log("ELIMINO 1 FILA: "+row.length);
        if(row.length == 0){
          alert("You should select 1 row to DELETE");
        } else {
          for(var i=0;i<row.length;i++){
            var request = $.ajax({
              url : "/api/v1/divorces-spanish/"+ row[i].autonomous_community +"?apikey="+$("#apikey").val(), //url : "/api/v1/divorces-spanish/" + row[i].autonomous_community + "?apikey=juanluw",
              type : "delete",
              dataType : "json"
            });
            keyOK(request);
          }
        }
      });

      ////POST
      $("#sendPost").click( function(){
        var ac = $("#autonomous-community").val(); //Con guion pk así es ID en html
        var year = $("#year").val();
        var a1 = $("#age_0_18").val();
        var a2 = $("#age_19_24").val();
        var a3 = $("#age_25_29").val();
        var a4 = $("#age_30_34").val();
        var mge = "";
        mge += '{"autonomous_community":\"' + ac + '\","year":' + year + ', "age_0_18":' + a1 + ', "age_19_24":' + a2 + ', "age_25_29":' + a3 + ', "age_30_34":' + a4 + '}';
        //console.log("Mensaje para POST: "+mge);

        var request = $.ajax({
          url : "/api/v1/divorces-spanish?apikey="+$("#apikey").val(), //url : "/api/v1/divorces-spanish/?apikey=juanluw",
          type : "POST",
          data : mge,
          dataType : "json",
          contentType : "application/json",
          async: false //MUY IMPORTANTE para ver ALERT
        });
        keyOK(request);
      }); //fin POST

      ////UPDATE
      $("#button_update").click( function () {
        var row = table.rows('.selected').data();
        if(row.length == 0){
          alert("You should select 1 row to UPDATE");
        } else {
          var datos = "";
          datos += '{"autonomous_community":'; //1º campo lo cojo del objeto,pk es "key" y no puede modificarse
          datos += '"';
          datos += row[0].autonomous_community;
          datos += '"';
          datos += ',';
          datos += '"year":';
          datos += $("#yearU").val();
          datos += ',';
          datos += '"age_0_18":';
          datos += $("#age_0_18U").val();
          datos += ',';
          datos += '"age_19_24":';
          datos += $("#age_19_24U").val();
          datos += ',';
          datos += '"age_25_29":';
          datos += $("#age_25_29U").val();
          datos += ',';
          datos += '"age_30_34":';
          datos += $("#age_30_34U").val();
          datos += '}';
          console.log("TOMA UPDATE: "+datos);
          var request = $.ajax({
            url : "/api/v1/divorces-spanish/"+row[0].autonomous_community+"?apikey="+$("#apikey").val(), //url : "/api/v1/divorces-spanish/"+row[0].autonomous_community+"?apikey=juanluw",
            type : "PUT",
            data : datos,
            dataType : "json",
            contentType : "application/json",
            async: false //MUY IMPORTANTE para ver ALERT
          });
          keyOK(request);
        }
      } );  ////finUPDATE*/

    }); //fin request.done
    request.always((jqXHR,status)=>{
      if(jqXHR.status == 401){
        alert("UNAUTHORIZED, you should change the apikey");
      } else if(jqXHR.status == 402){
        alert("You SHOULD change apikey, is incorrect");
      } else if(jqXHR.status == 403){
        alert("You can not modify data, because you don not have permission\nCHANGE the apikey or DATA");
      } else if(jqXHR.status == 404){
        alert("NOT FOUND");
      } else if(jqXHR.status == 409){
        alert("CONFLICT exist data yet\n You should add other AUTONOMOUS-COMMUNITY or YEAR");
      } else if(jqXHR.status == 429){
        alert("You SHOULD pay other time");
      }
    });

  });//FIN READY
}
