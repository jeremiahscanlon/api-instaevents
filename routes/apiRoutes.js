module.exports = function(app){
	var User = require('../models/user.js');
	var Event = require('../models/event.js');

	app.post('/login', function(req,res){
		var user = User.findOne({ 'email': req.body.email }, function (err, person) {
			if (err || person == null) {
				return res.status(401).send("That user does not exist");
			}
			if (person.password !== req.body.password) {
				return res.status(401).send("The password doesn't match that user");
			}
			res.status(201).send({
				//id_token: createToken(person)
				string:'its all good',
				result: person
			});

		});

		// if (!user) {
		// 	return res.status(401).send("That user does not exist");
		// }
        //
		// if (user.password !== req.body.password) {
		// 	return res.status(401).send("The password doesn't match that user");
		// }
        //
		// res.status(201).send({
		// 	//id_token: createToken(user)
		// 	result:'its all good',
		// 	result: user._id
		// });

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
		console.log(req.body);
		console.log(req.body.username);
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

	app.post('/eventInvite', function(req,res){
		Event.findOneAndUpdate({'_id': req.body.eventID}, {$push:{"attendees.invited":req.body.userID}})
			.exec(function(err, doc){
				if (err){
					console.log(err);
				} else {
					console.log(doc);
				}
			});
		res.json({
			result:'its all good'
		});

	});
	
	
};