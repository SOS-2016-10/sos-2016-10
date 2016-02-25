var express= require("express");

var app = express();

app.get("/", (req,res) => {

res.write("<html><body><div>Welcome, this is an app from group 10 of SOS.
 We are working with data related to gender-violence</div><ul>
 <li>Juan Luis Durante - divorces-spanish</li>
 <li>Pascual Requena - mortal-victims</li>
 <li>Ulises Cervera - telematic-monitoring</li></ul></body></html>");
res.end();
});

app.listen(process.env.PORT);
