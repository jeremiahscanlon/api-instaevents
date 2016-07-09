module.exports = function(app){
	var User = require('../models/user.js');
	var Event = require('../models/event.js');

	app.get('/', function(req,res){
		res.redirect('http://www.google.com')
	});

	app.get('/users', function(req, res){
		User.find({}, function(err, doc){
			if (err){
				console.log(err);
			} else {
				res.json(doc);
			}
		});
	});

	app.get('/events', function(req, res){
		Event.find({}, function(err, doc){
			if (err){
				console.log(err);
			} else {
				res.json(doc);
			}
		});
	});

	app.post('/newuser', function(req,res){
		var newuser = new User(req.body);

		newuser.save(function (err, newuser) {
			if (err) return console.error(err);
		});

		res.json({
			result:'its all good',
			user_id: newuser._id
		});

	});
};