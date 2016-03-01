var express = require('epress');
var app = express();
app.get('/about/telematic-monitorings', (req,res)=>{
  res.write("<html><body><div>Hello World!, My data is related to the number of telematic monitoring systems in Spain</div><div> I will get the info from this source:http://www.violenciagenero.msssi.gob.es/violenciaEnCifras/home.htm</div></body></html>");
  res.end();
});

/*
app.get('/about/telematic-monitorings', (req,res)=>{
  console.log("Telematic-monitorings");
  res.write("<html><body><h1>Telematic-monitorings</h1>");
  res.write("Hello World!");
  res.write("</body></html>");
  res.end();
});
*/
app.listen(process.env.PORT);
