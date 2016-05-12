var contSearch=0;
var limitOnChange1=0;
var limitOnChange2=0;

//Funcion NEXT
function next(){
  var limitPage = parseInt( $("#limitt").val() );
  limitOnChange2=limitOnChange1;
  limitOnChange1=limitPage;
  //
  if(limitOnChange1 != limitOnChange2){
      contSearch=0;
  }
  var key=$('#apikey').val();
  var request = $.ajax({
      url:"/api/v1/divorces-spanish?apikey="+key+"&offset="+contSearch+"&limit="+limitPage,
      type:"GET",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
        //$("#columns").datagrid("loadData", {"total":data.length,"rows":data});
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
        $("#next").prop( "disabled", false );
        $("#last").prop( "disabled", false );

        if(limitPage>data.length){
           $("#next").prop( "disabled", true );
        }else{
           contSearch+=limitPage;
        }
      },
      error: function (jqXHR){
        if(jqXHR.status==401){
          alert("UNAUTHORIZED, you should change the apikey");
        }
      }
  });
}
//Funcion LAST
function last(){
  var limitPage=parseInt( $("#limitt").val() );
  var key=$('#apikey').val();
  contSearch-=limitPage;

  limitOnChange2=limitOnChange1;
  limitOnChange1=limitPage;
  if(limitOnChange1!=limitOnChange2){
    contSearch=0;
  }

  var request = $.ajax({
    url:"/api/v1/divorces-spanish?apikey="+key+"&offset="+contSearch+"&limit="+limitPage,
    type:"GET",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
      //$('#participantsnumber').datagrid('loadData', {"total":data.length,"rows":data});
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
      $("#next").prop( "disabled", false );
      if(contSearch<=0){
        $("#last").prop( "disabled", true );
        contSearch+=limitPage;
      }
    },
    error: function (jqXHR){
      if(jqXHR.status==401){
        alert("UNAUTHORIZED, you should change the apikey");
      }
    }
  });
}

//Funcion NEXTYEAR
function nextYear(){
  var year = parseInt($("#yearS").val());
  var limitPage = parseInt( $("#limitt").val() );
  limitOnChange2=limitOnChange1;
  limitOnChange1=limitPage;
  //
  if(limitOnChange1 != limitOnChange2){
      contSearch=0;
  }
  var key=$('#apikey').val();
  var request = $.ajax({
      url:"/api/v1/divorces-spanish/?apikey="+key+"&year="+year+"&offset="+contSearch+"&limit="+limitPage,
      type:"GET",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
        //$("#columns").datagrid("loadData", {"total":data.length,"rows":data});
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
        $("#nexty").prop( "disabled", false );
        $("#lasty").prop( "disabled", false );

        if(limitPage>data.length){
           $("#nexty").prop( "disabled", true );
        }else{
           contSearch+=limitPage;
        }
      },
      error: function (jqXHR){
        if(jqXHR.status==401){
          alert("UNAUTHORIZED, you should change the apikey");
        } else if(jqXHR.status==404){
          alert("NOT FOUND, please write another YEAR");
        }
      }
  });
}
//Funcion LASTYEAR
function lastYear(){
  var year = parseInt($("#yearS").val());
  var limitPage=parseInt( $("#limitt").val() );
  var key=$('#apikey').val();
  contSearch-=limitPage;

  limitOnChange2=limitOnChange1;
  limitOnChange1=limitPage;
  if(limitOnChange1!=limitOnChange2){
    contSearch=0;
  }

  var request = $.ajax({
    url:"/api/v1/divorces-spanish/?apikey="+key+"&year="+year+"&offset="+contSearch+"&limit="+limitPage,
    type:"GET",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
      //$('#participantsnumber').datagrid('loadData', {"total":data.length,"rows":data});
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
      $("#nexty").prop( "disabled", false );
      if(contSearch<=0){
        $("#lasty").prop( "disabled", true );
        contSearch+=limitPage;
      }
    },
    error: function (jqXHR){
      if(jqXHR.status==401){
        alert("UNAUTHORIZED, you should change the apikey");
      } else if(jqXHR.status==404){
        alert("NOT FOUND, please write another YEAR");
      }
    }
  });
}


//Funcion auxiliar
//Funcion numeroFilas
function numRow(){
  var row = table.rows('.selected').data();
  if(row.length == 0){
    alert("You should select 1 row to UPDATE");
  }
}

//Funcion paginar
/*function paginar(total){
  var limit = $("#limitt").val();
  var num = Math.ceil(total/limit); //Redondeo por arriba para paginación
  console.log("HOY SI: "+num);
  var cont = 0;
  for(var i=1;i<=num;i++){
    $("#paginas").append("<input id=\"pg"+i+"\" type=\"button\" class=\"btn btn-warning\" value=\""+i+"\" onclick=\"create_table('/api/v1/divorces-spanish/?apikey=juanlur&limit="+limit+"&offset="+cont+"')\" />");
    //console.log("<input id=\"pg"+i+"\" type=\"button\" value=\""+i+"\" onclick=\"create_table('/api/v1/divorces-spanish/?apikey=juanlur&limit="+limit+"&offset="+cont+"')\" />");
    cont = parseInt(cont) + parseInt(limit);
  }
}*/

//Funcion para crear las tablas
function create_table(url){
  var request = $.ajax({
    url : url, //"/api/v1/divorces-spanish/?apikey="+$("#apikey").val()+"&limit="+limit+"&offset=5",
    type : "GET"
  });
  this.keyOK(request); //CREO
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

/*//Funcion mostrar botones NEXT y LAST para paginacion
function mostrarLastNext(){
  document.getElementById('paginas').style.display = 'block';
}*/

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
  /*request.done((data)=>{
    paginar(data.length);
  });*/

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
    //Muestro botones NEXT y LAST ***oculto inversa***
    $("#last").show();
    $("#next").show();
    $("#lasty").hide();
    $("#nexty").hide();

    var limit = parseInt( $("#limitt").val() );
    this.create_table('/api/v1/divorces-spanish?apikey=juanlur&limit='+limit+'&offset=0');
  } else { ////////////////// HAY SEARCH //////////////////////
    //Oculto botones NEXT y LAST ****muestro inversa***
    $("#last").hide();
    $("#next").hide();
    $("#lasty").show();
    $("#nexty").show();

    var limit = parseInt( $("#limitt").val() );
    var key = $("#apikey").val();
    var url = "/api/v1/divorces-spanish/?apikey="+key+"&year="+year+"&limit="+limit+"&offset=0";
    console.log(url);
    this.create_table(url);
    } //fin else
}
