const express = require("express"),
http = require('http'),
cors = require('cors'),
glob = require('glob'),
mongoose = require("mongoose"),
path = require('path'),
config = require('./config');

//  express initialisation
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'If-None-Match, Content-Type, Authorization, Content-Length, X-Requested-With, Cache-Control, Expires, Pragma');
    res.header('Access-Control-Max-Age', '86400');
    if ('OPTIONS' === req.method) {
      res.sendStatus(200);
    } else { 
      next();
    }
});

// file imports
glob.sync( './models/*.models.js' ).forEach( function(file) {
    require(path.resolve(file));
});
glob.sync( './routes/*.routes.js' ).forEach( function(file) {
    require(path.resolve(file))(app);
});

// db connection 
mongoose.connect('mongodb://localhost:27017/'+config.dbname);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("MongoDB connected");
});

// start server
const httpserver = http.createServer(app);
httpserver.listen(config.port,(()=>{
    console.log("Server Initiated");
}));

// error handling
app.use((err, req, res, next) => {
    if (err.code === "ERR_HTTP_HEADERS_SENT") return;
    let code = err.code || 400;
    let message = err.message || "Bad request";
    res.status(code);
    res.send(message);
});