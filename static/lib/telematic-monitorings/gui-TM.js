$(document).ready(function (){
    console.log("JQuery ready");






/*
    request.done((data,status,jqXHR)=>{
      //$(document).ready( function () { ////
      paginar(data.length);
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
*/
      //var table = $("#columns").DataTable(); //Tabla "table"
      //table.destroy();

      //**** Seleccionar una fila ****
      $('#columns tbody').on( 'click', 'tr', function () {
          $(this).toggleClass('selected');
          /*if ( $(this).hasClass('selected') ) { //Si está en Clase "selected"
              $(this).removeClass('selected'); //entonces lo quito de "selected"
          }
          else {
              table.$('tr.selected').removeClass('selected');
              $(this).addClass('selected'); //Añado a la clase "selected"
          }*/
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
            contentType : "application/json"
          });
          keyOK(request);
        }
      } );
      ////finUPDATE

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

    //}); //fin ready ////
    //}); //fin done
/*
    request.always((jqXHR,status)=>{
      if((jqXHR.status == 401) || (jqXHR.status == 403)){
        alert("You can not modify data, because you don not have permission");
      }
    });
*/
  }); //FIN ready
/*
  <!-- /////////////////////////////////////////////////////////////////////////// GOOGLE ///////////////////// -->

  google.load("visualization", "1", {packages:["corechart"]});
  google.setOnLoadCallback(drawChart);
  function drawChart() {
    var request = $.ajax({
      url: "/api/v1/divorces-spanish?apikey=juanlur"
    });
    request.done(function(data,status,jqXHR){
      var datos = [];
      datos.push(['Task', 'Age_30_34']);

      for(var i in data){ //Recorro todo los objetos
        var obj = data[i];
        datos.push([obj.autonomous_community,obj.age_30_34]);
      }
      console.warn(datos);
      var data = google.visualization.arrayToDataTable(datos);
      var options = {
        title: 'Divorces in Spain'
      };

      var chart = new google.visualization.PieChart(document.getElementById('piechart'));

      chart.draw(data, options);
    });
  }
*/
