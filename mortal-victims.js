var express= require("express");

var app = express();

app.get("/about/mortal-victims", (req,res) => {

res.write("<html><body><div>Welcome, My data is related to the
 number of mortal victims in Spain</div><div> I will get the info from this source:
  http://www.violenciagenero.msssi.gob.es/violenciaEnCifras/boletines/home.html</div>
 </body></html>");
res.end();
});

app.listen(process.env.PORT);