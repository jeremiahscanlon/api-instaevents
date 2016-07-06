// Dependencies
// =============================================================
var express 	= require('express');
var mongoose 	= require('mongoose');
var bodyParser 	= require('body-parser');

// Sets up the Express App
// =============================================================
var app = express();

// Sets up the Express app to handle data parsing.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// the routes
// =============================================================
require("./routes/apiRoutes.js")(app);

// connect to database
// =============================================================
require("./config/connection.js")(app);

// Starts the server to begin listening 
// =============================================================
var PORT = process.env.PORT || 8080;
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})