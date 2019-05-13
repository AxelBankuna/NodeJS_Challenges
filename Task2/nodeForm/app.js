var express = require('express');
var app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(express.static('./'));
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.multipart());

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.get("/form", function (req, res) {
    res.sendfile("./form.html");
});

app.post("/form", urlencodedParser, function (req, res) {
    // console.log(req.body);      // your JSON
    // res.send(req.body);    // echo the result back
    // res.send("hello...");
    var email = req.body.email;
    var password = req.body.pwd;
    // res.send("email: " + email + " password: " + password);
    res.send(req.body);
});

app.listen(8000);
console.log("localhost:8000");