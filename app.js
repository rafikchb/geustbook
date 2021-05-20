let http = require("http"); 
let express = require("express"); 
let logger = require("morgan"); 
let path = require("path"); 
const { response } = require("express");


let app =  express();// creatig the request handler  

app.set("x-powered-by", false);
app.set("views", path.resolve(__dirname, "views"));
app.set("views engine", "ejs");   

let entries = []; 
app.locals.entries = entries; 
app.use(logger("dev")); 
app.use(express.urlencoded({extended: false}));
app.get("/", function(req,res){ 
res.render("index.ejs"); 
}) ; 

app.get("/new-entry",function(req,res){ 
res.render("new-entry.ejs"); 
}); 


app.post("/new-entry", function(req,res){ 
if(!req.body.title || !req.body.body){
    res.status(400).send("entries myst have a title and a body");
     return;
}

entries.push({ 
    title:req.body.title, 
    content : req.body.body , 
    published : new Date()
}); 

res.redirect("/"); 
}); 

app.use(function(req,res){
res.status(404).render("404.ejs"); 
}); 

http.createServer(app).listen(process.env.PORT || 3000,function(){
console.log("geustBook app started "); 
}); 