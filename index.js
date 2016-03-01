//Ejecución ASINCRONA con EXPRESS
var express = require("express");
//var fs = require("fs"); //modulo viene de fábrica(NO INSTALAR)
var contacts = []; //Inicializo a array vacio

var app = express();

//Me creo rutas estáticas
app.use(express.static('about'));
//app.use(express.static('divorces-spanish'));
app.use('/about', express.static('divorces-spanish'));

//GET para página principal
app.get("/",(req,res) => {
  console.log("Main Menú");
  res.write("<html><body><h1>SOS-2016-10</h1>");
  res.write("<h2><a href=\"/about\">About</a></h2>");
  res.write("</body></html>");
  res.end();
});
<<<<<<< HEAD

=======
///
>>>>>>> bd2bd8488712b54fdb71656f525836311af20d22
//GET para ABOUT
app.get("/about",(req,res) => {
  console.log("About");
  res.write("<html><body><h1>About</h1>");
  res.write("<p>Welcome, this is an app from group 10 of SOS. We are working with data related to gender-violence</p>");
  res.write("<ul><li><a href=\"/about/divorces-spanish\">Juan Luis Dorante - divorces-spanish</a></li>");
  res.write("<li><a href=\"/about/mortal-victims\">Pascual Requena - mortal-victims</a></li>");
  res.write("<li><a href=\"/about/telematic-monitorings\">Ulises Cervera - telematic-monitoring</li></ul>");
  res.write("</body></html>");
  res.end();
});

//GET para DIVORCES-SPANISH(Juanlu)
app.get("/about/divorces-spanish",(req,res) => {
  console.log("Divorces-spanish");
  res.write("<html><body><h1>Divorces Spanish</h1>");

  res.write("<p>Hello, My data is related to the number of divorces in Spain. I will get the info from this source: <a href=\"http://www.ine.es/jaxi/menu.do?type=pcaxis&path=/t18/p420/p01/&file=inebase\">http://www.ine.es/jaxi/menu.do?type=pcaxis&path=/t18/p420/p01/&file=inebase</a></p>");

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


//GET para Telematic-monitorings(Ulises)
app.get('/about/telematic-monitorings', (req,res)=>{
  console.log("Telematic-monitorings");
  res.write("<html><body><h1>Telematic-monitorings</h1>");
  res.write("<p>Hello World!, My data is related to the number of telematic monitoring systems in Spain</div><div> I will get the info from this source:http://www.violenciagenero.msssi.gob.es/violenciaEnCifras/home.htm</p>");
  res.write("</body></html>");
  res.end();
});

//GET para Mortal-victims(Requena)
app.get('/about/mortal-victims', (req,res)=>{
  console.log("Mortal-victims");
  res.write("<html><body><h1>Mortal-victims</h1>");
  res.write("<p>Welcome, My data is related to the number of mortal victims in Spain</div><div> I will get the info from this source:<a href= \" http://www.violenciagenero.msssi.gob.es/violenciaEnCifras/boletines/home.htm \">Here</a></p>");
  //Tabla
  //Columnas
  res.write("<table cellspacing=\"10\" cellpadding=\"10\" border=\"3\"><tr><th scope=\"col\">autonomous-community</th>");
  res.write("<th scope=\"col\"><strong>year</th>");
  res.write("<th scope=\"col\"><strong>victim-age</th>");
  res.write("<th scope=\"col\"><strong>mortal-victims</th></tr>");

  //Filas
  res.write("<tr><td>Andalucia</td>");
  res.write("<td>2015</td>");
  res.write("<td>1-30</td>");
  res.write("<td>3</td></tr>");

  res.write("<tr><td>Madrid</td>");
  res.write("<td>2013</td>");
  res.write("<td>31-85</td>");
  res.write("<td>9</td></tr></table>");

  res.write("</body></html>");
  res.end();
});


//app.listen(3000); //Para probar en local
app.listen(process.env.PORT); //variable entorno para puerto que me dice Heroku
