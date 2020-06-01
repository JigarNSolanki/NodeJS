require('rootpath')();          // To get the current directory as default
var express = require("express");
var app = express();
var cors = require('cors');     // package to provide connect/express middleware

var bodyParser = require('body-parser');
var config = require("./config/");
var mongoose = require("mongoose");

var port = process.env.PORT || 8080;

app.use("/assets", express.static("/public"));
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({ extended: false }));        // handle url encoded data
app.use(bodyParser.json());            // parse json out of http request 
app.use(cors());

mongoose.connect(config.getDBConnectionString());
mongoose.Promise = global.Promise;

// api routes for user
app.use('/users', require('./controller/userController'));
// api routes for expenses
app.use('/expenses', require('./controller/expenseController'));


app.listen(port);

