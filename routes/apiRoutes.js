module.exports = function(app){
	var User = require('../models/user.js');
	var Event = require('../models/event.js');

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

	app.post('/newevent', function(req,res){
		var newevent = new Event(req.body);
		newevent.save(function (err, newevent) {
			if (err) return console.error(err);
		});
		res.json({
			result:'its all good',
			event_id: newevent._id
		});

	});

	app.get('/eventInvite', function(req,res){
		// Event.findOneAndUpdate({'_id': req.body.eventID}, {$push:{"attendees.invited":req.body.userID}})
		// 	.exec(function(err, doc){
		// 		if (err){
		// 			console.log(err);
		// 		} else {
		// 			console.log(doc);
		// 		}
		// 	});
		res.json({
			result:'its all good'
		});

	});
};