var express = require('express');
var app = express();

app.use(express.static('./JS_MemoryGame'));

app.listen(8080);
console.log("localhost:8080");