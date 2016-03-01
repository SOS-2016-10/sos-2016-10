//Ejecución ASINCRONA con EXPRESS
var express = require("express");
//var fs = require("fs"); //modulo viene de fábrica(NO INSTALAR)
var contacts = []; //Inicializo a array vacio

var app = express();

//Me creo rutas estáticas
app.use(express.static('about'));
app.use('/about', express.static('divorces-spanish'));

//GET para página principal
app.get("/",(req,res) => {
  console.log("Main Menú");
  res.write("<html><body><h1>SOS-2016-10</h1>");
  res.write("<h2><a href=\"/about\">About</a></h2>");
  res.write("</body></html>");
  res.end();
});

//GET para ABOUT
app.get("/about",(req,res) => {
  console.log("About");
  res.write("<html><body><h1>About</h1>");
  res.write("<p>Welcome, this is an app from group 10 of SOS. We are working with data related to gender-violence</p>");
  res.write("<ul><li><a href=\"/about/divorces-spanish\">Juan Luis Durante - divorces-spanish</a></li>");
  res.write("<li>Pascual Requena - mortal-victims</li>");
  res.write("<li>Ulises Cervera - telematic-monitoring</li></ul>");
  res.write("</body></html>");
  res.end();
});

//GET para DIVORCES-SPANISH(Juanlu)
app.get("/about/divorces-spanish",(req,res) => {
  console.log("Divorces-spanish");
  res.write("<html><body><h1>Divorces Spanish</h1>");

  //Tabla
  //Columnas
  res.write("<table cellspacing=\"10\" cellpadding=\"10\" border=\"3\"><tr><th scope=\"col\">autonomous-community</th>");
  res.write("<th scope=\"col\"><strong>year</th>");
  res.write("<th scope=\"col\"><strong><18 age</th>");
  res.write("<th scope=\"col\"><strong>19<24 age</th>");
  res.write("<th scope=\"col\"><strong>25<29 age</th>");
  res.write("<th scope=\"col\"><strong>30<34 age</th>");
  res.write("<th scope=\"col\">35<39 age</th>");
  res.write("<th scope=\"col\">40<49 age</th></tr>");

  //Filas
  res.write("<tr><td>Andalucia</td>");
  res.write("<td>2014</td>");
  res.write("<td>1</td>");
  res.write("<td>56</td>");
  res.write("<td>537</td>");
  res.write("<td>1860</td>");
  res.write("<td>3416</td>");
  res.write("<td>6781</td></tr></table>");

  res.write("</body></html>");
  res.end();
});


//app.listen(3000); //Para probar en local
app.listen(process.env.PORT); //variable entorno para puerto que me dice Heroku
