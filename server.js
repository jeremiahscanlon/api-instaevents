// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
var express 	= require('express');
var mongoose 	= require('mongoose');
var bodyParser 	= require('body-parser');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/testusers');
var Schema = mongoose.Schema;

// Need to add stuff like validation and required, etc...
// Zip with a first number 0 isn't registering properly
var userSchema = new Schema({
	username: {
		type: String,
		unique: true,
	},
	password: String,
	email: String,
	picture: String,
	bio: String,
	friends: [{
    	type: Schema.Types.ObjectId,
    	ref: 'User'
    }],
	age: Number,
	homezip: Number,
	workzip: Number,
	settings: {
		notifications: Boolean,
	}
})

var User = mongoose.model('User', userSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("We're connected!")

	var kevin = new User({
		username: 'KJG310',
		password: 'password',
		email: 'KJG310@Gmail.com',
		picture: 'http://www.digitaljournal.com/img/5/9/2/8/1/2/i/1/2/6/o/tard3.JPG',
		bio: 'I love playing all sorts of sports and video games!',
		// friends: [{
	 //    	type: Schema.Types.ObjectId,
	 //    	ref: 'User'
	 //    }],
		age: 27,
		homezip: 07920,
		workzip: 07920,
		settings: {
			notifications: true,
		}
	});

	kevin.save(function (err, kevin) {
		if (err) return console.error(err);
	});

	console.log(kevin)

})

// Sets up the Express app to handle data parsing.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// Starts the server to begin listening 
// =============================================================
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})

app.get('/', function(req,res){
	res.redirect('http://www.google.com')
})

app.post('/', function(req,res){
	console.log('request recieved!')
	console.log(req.body)
	var bodyjson = JSON.parse(req.body)
	console.log(bodyjson)


	var newuser = new User({
		username: bodyjson.username,
		password: bodyjson.password,
		email: bodyjson.email,
		picture: bodyjson.picture,
		bio: bodyjson.bio,
		// friends: [{
	 //    	type: Schema.Types.ObjectId,
	 //    	ref: 'User'
	 //    }],
		age: bodyjson.age,
		homezip: bodyjson.homezip,
		workzip: bodyjson.workzip,
		settings: {
			notifications: false,
		}
	})

	newuser.save(function (err, newuser) {
		if (err) return console.error(err);
	});


	res.send('hey')
})