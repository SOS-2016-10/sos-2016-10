//Ejecución ASINCRONA con EXPRESS
var express = require("express");

var app = express();
//Puede tener 2 valores, o la variable entorno PORT o 3000
//Evaluación perezosa
var port = (process.env.PORT || 3000);

//Me creo rutas estáticas
app.use(express.static(__dirname + '/css')); //Es como si folder "css" no existiera, y estuviera todo en RAIZ
app.use(express.static(__dirname + '/html')); //Es como si folder "html" no existiera, y estuviera todo en RAIZ
//app.use('/about/divorces-spanish', express.static(__dirname + '/html/about/divorces-spanish')); //lo que quiero que ponga en url, donde está realmente

//GET para página principal
app.get("/",(req,res) => {
  console.log("Main Menu");
});

//GET para ABOUT
app.get("/about",(req,res) => {
  console.log("About");
});

//GET para TIME
app.get("/time",(req,res) => {
  console.log("New request to TIME arrived!");
});

//GET para DIVORCES-SPANISH(Juanlu)
app.get("/about/divorces-spanish",(req,res) => {
  console.log("Divorces-spanish");
});


//GET para Telematic-monitorings(Ulises)
app.get('/about/telematic-monitorings', (req,res)=>{
  console.log("Telematic-monitorings");
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
//app.listen(process.env.PORT); //variable entorno para puerto que me dice Heroku
//Hago callback porque es asincrono
app.listen(port, ()=>{
  console.log("Magic happens on port "+port);
});
