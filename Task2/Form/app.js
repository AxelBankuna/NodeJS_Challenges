var http = require("http");
var express = require("express");
var app = express();

app.use(express.bodyParser());
app.use(app.router);

app.get("/", function (req, res) {
    res.send("I am from / GET req");
});

http.createServer(app).listen(3000);