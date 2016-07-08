// Dependencies
// =============================================================
var express 	= require('express');
var path		= require('path');
var bodyParser 	= require('body-parser');
var favicon 	= require('serve-favicon');
var logger 		= require('morgan');
// uncomment when we want to use SSL
//var LEX 		= require('letsencrypt-express').testing();
//var lex			= require('./config/letsEncryptExpress');

// Set up the Express App
// =============================================================
var app = express();

// Sets up the Express app to handle data parsing.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// Serve the Favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

// Dev logging
app.use(logger('dev'));

// the routes
// =============================================================

// load the public folder
app.use(express.static(path.join(__dirname, 'public')));

// api routes
require("./routes/apiRoutes.js")(app);

// connect to database
// =============================================================
require("./config/connection.js")(app);

// start the letsencrypt express application
// =============================================================
// lex.onRequest = app;
// lex.listen([8080], [43], function () {
// 	var protocol = ('requestCert' in this) ? 'https': 'http';
// 	console.log("Listening at " + protocol + '://localhost:' + this.address().port);
// });

// Starts the server to begin listening 
// =============================================================
var PORT = process.env.PORT || 80;
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})