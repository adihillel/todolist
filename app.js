//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const { render } = require("express/lib/response");

const app = express();
app.set('view engine', 'ejs'); //maybe use
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const items = [];

app.get("/", function(req, res){
    var today = new Date();
    var currentDay = today.getDay();
    var day = "";

    var options = {
        weekday : "long",
        day: "numeric",
        month: "long"
    };
    
    day = today.toLocaleDateString("en-US",options);
   
    res.render("list",{
        kindOfDay:day,
        newListItem:items
    });
    
});

app.post("/",function(req,res){
    const item = req.body.newItem;
    items.push(item);

    res.redirect("/");
});

app.get("/about",function(req,res){
    res.render("about");
})

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
