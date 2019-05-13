const express = require("express")

const app = express()

app.use(express.static("public"))
app.set('view engine', 'pug')

app.get("/", function (req, res) {
    res.send("Our Weather App");
});

app.get("/weather", function(req, res){
    res.render(__dirname+"/public/pug/weather")
})

app.listen(8880, function(err){
    if(err){
        console.log("Error...")
    }
    console.log("Running weather app at http://localhost:8880/")
})