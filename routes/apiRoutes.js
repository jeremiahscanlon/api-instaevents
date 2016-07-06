module.exports = function(app){
	app.get('/', function(req,res){
		res.redirect('http://www.google.com')
	});

	app.post('/', function(req,res){
		console.log('request recieved!');
		console.log(req.body);
		var bodyjson = JSON.parse(req.body);
		console.log(bodyjson);


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
				notifications: false
			}
		});

		newuser.save(function (err, newuser) {
			if (err) return console.error(err);
		});


		res.send('hey')
	});
};