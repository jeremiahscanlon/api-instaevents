module.exports = function(app){
	var User = require('../models/user.js');
	var Event = require('../models/event.js');
	var jwt = require('jsonwebtoken');
	var _ = require('lodash');
	var secret = 'ugointashowup';

	function createToken(user) {
		return jwt.sign(_.omit(user, 'password'), secret, { expiresIn: 60*60*5 });
	}

	app.post('/login', function(req,res){
		var user = User.findOne({ 'email': req.body.email }, function (err, person) {
			if (err || person == null) {
				return res.status(401).send("That user does not exist");
			}
			if (person.password !== req.body.password) {
				return res.status(401).send("The password doesn't match that user");
			}
			res.status(201).send({
				id_token: createToken(person)
			});
		});
	});
	
	app.get('/users', function(req, res){
		User.find({delete:false}, function(err, doc){
			if (err){
				console.log(err);
			} else {
				res.json(doc);
			}
		});
	});

	app.get('/events', function(req, res){
		Event.find({deleted:{$ne: true}}, function(err, doc){
			if (err){
				console.log(err);
			} else {
				res.json(doc);
			}
		});
	});

	app.post('/newUser', function(req,res){
		var newuser = new User(req.body);
		newuser.save(function (err, newuser) {
			if (err) return console.error(err);
		});
		res.json({
			result:'its all good',
			user_id: newuser._id
		});
	});

	app.post('/updateUser', function(req,res){
		User.findOneAndUpdate({'_id': req.body.userID}, req.body.changes)
			.exec(function(err, doc){
				if (err || doc == null){
					console.log(err);
					res.json({
						result:'whoops couldn\'t find that user'
					});
				} else {
					res.json({
						result:'user info updated for id: '+doc._id
					});
				}
			});
	});

	app.post('/newEvent', function(req,res){
		var newevent = new Event(req.body);
		newevent.save(function (err, newevent) {
			if (err) return console.error(err);
		});
		res.json({
			result:'its all good',
			event_id: newevent._id
		});
	});

	app.post('/updateEvent', function(req,res){
		Event.findOneAndUpdate({'_id': req.body.eventID}, req.body.changes)
			.exec(function(err, doc){
				if (err || doc == null){
					console.log(err);
					res.json({
						result:'whoops couldn\'t find that user'
					});
				} else {
					res.json({
						result:'event info updated for id: '+doc._id
					});
				}
			});
	});

	app.post('/deleteEvent', function(req,res){
		Event.findOneAndUpdate({'_id': req.body.eventID}, {"deleted":true})
			.exec(function(err, doc){
				if (err || doc == null){
					console.log(err);
					res.json({
						result:'whoops couldn\'t find that event'
					});
				} else {
					res.json({
						result:'event: '+doc._id+' deleted'
					});
				}
			});
	});

	app.post('/eventInvite', function(req,res){
		Event.findOneAndUpdate({'_id': req.body.eventID}, {$push:{"attendees.invited":req.body.userID}})
			.exec(function(err, doc){
				if (err || doc == null){
					console.log(err);
				} else {
					res.json({
						result:'user invited to event: '+doc._id
					});
				}
			});
	});

	app.post('/eventIn', function(req,res){
		Event.findOneAndUpdate({'_id': req.body.eventID}, {$push:{"attendees.in":req.body.userID}})
			.exec(function(err, doc){
				if (err || doc == null){
					console.log(err);
				} else {
					res.json({
						result:'user in for event: '+doc._id
					});
				}
			});
	});
	app.post('/eventOut', function(req,res){
		Event.findOneAndUpdate({'_id': req.body.eventID}, {$push:{"attendees.out":req.body.userID}})
			.exec(function(err, doc){
				if (err || doc == null){
					console.log(err);
				} else {
					res.json({
						result:'user out of event: '+doc._id
					});
				}
			});
	});
	app.post('/eventWatching', function(req,res){
		Event.findOneAndUpdate({'_id': req.body.eventID}, {$push:{"attendees.watching":req.body.userID}})
			.exec(function(err, doc){
				if (err || doc == null){
					console.log(err);
				} else {
					res.json({
						result:'user watching event: '+doc._id
					});
				}
			});
	});

	app.post('/eventTag', function(req,res){
		Event.findOneAndUpdate({'_id': req.body.eventID}, {$push:{"tags":req.body.tag}})
			.exec(function(err, doc){
				if (err || doc == null){
					console.log(err);
				} else {
					res.json({
						result:'tag added to event: '+doc._id
					});
				}
			});
	});

	app.post('/acceptFriend', function(req,res){
		User.findOneAndUpdate(
				{$and: [{'_id': req.body.userID}, {'friends.accepted':{$ne:req.body.friendID}}]},
				{$push: {'friends.accepted':req.body.friendID}}
			)
			.exec(function(err, doc){
				if (err || doc == null){
					console.log(err);
					res.json({
						result:'already friends'
					});
				} else {
					User.findOneAndUpdate({'_id': req.body.friendID}, {$push:{'friends.accepted':req.body.userID}})
						.exec(function(err, doc){
							if (err || doc == null){
								console.log(err);
							} else {
								res.json({
									result:'friend added to user: '+doc._id
								});
							}
						});
				}
			});
	});

	app.post('/requestFriend', function(req,res){
		User.findOneAndUpdate(
			{$and: [{'_id': req.body.userID}, {'friends.accepted':{$ne:req.body.friendID}}, {'friends.requested':{$ne:req.body.friendID}}]},
			{$push: {'friends.requested':req.body.friendID}}
		)
			.exec(function(err, doc){
				if (err || doc == null){
					console.log(err);
					res.json({
						result:'already requested or already friends'
					});
				} else {
					res.json({
						result:'requested to be friends with user: '+doc._id
					});
				}
			});
	});
};