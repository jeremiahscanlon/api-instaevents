module.exports = function(app){
	var User = require('../models/user.js');
	var Event = require('../models/event.js');
	var jwt = require('jsonwebtoken');
	var _ = require('lodash');
	var secret = 'ugointashowup';
	var request = require('request');

	function createToken(user) {
	    console.log("creating token for: " + user._id);
		return jwt.sign(_.omit(user, 'password'), secret, { expiresIn: 60*60*5 });
	}

    function readToken(token) {
        //return jwt.sign(_.omit(user, 'password'), secret, { expiresIn: 60*60*5 });
        return jwt.verify(token, secret);
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

    app.post('/newUser', function(req,res){
        var newuser = new User(req.body);
        newuser.save(function (err, person) {
            if (err || person == null) return res.status(401).send(err);
            User.findOne({ '_id': person._id }, function (err, person2) {
                if (err || person2 == null) {
                    return res.status(401).send("That user does not exist");
                }
                res.status(201).send({
                    id_token: createToken(person2)
                });
            });
        });
    });

    app.post('/updateUser', function(req,res){
		var userInformation = readToken(req.headers.token);
        User.findOneAndUpdate({'_id': userInformation._id}, req.body.changes)
            .exec(function(err, doc){
                if (err || doc == null){
                    console.log(err);
                    res.status(401).json({
                        result:'whoops couldn\'t find that user'
                    });
                } else {
                    res.status(201).json({
                        result:'user info updated for id: '+doc._id
                    });
                }
            });
    });
	
	app.get('/users', function(req, res){
		User.find({deleted:{$ne: true}}, function(err, doc){
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

	app.post('/events/search', function(req, res){
		var type = req.body.type;
		switch(type) {
			case 'searchPage':
				console.log("return results from search page");
				Event.find({deleted:{$ne: true}}, function(err, doc){
					if (err){
						console.log(err);
					} else {
						res.json(doc);
					}
				});
				break;
			case 'all':
				console.log("return all results");
				Event.find({deleted:{$ne: true}}, function(err, doc){
					if (err){
						console.log(err);
					} else {
						res.json(doc);
					}
				});
				break;
			default: // Default code IS working
				console.log("search type not valid");
				res.status(401).json({
					result:'search type not valid'
				});
		}

	});

	app.get('/events/:id', function(req, res){
		Event.find({$and: [{'_id': req.params.id}, {deleted:{$ne: true}}]}, function(err, doc){
			if (err || doc == null){
				console.log(err);
				res.status(401).send("That event does not exist");
			} else {
				res.status(201).json(doc);
			}
		});
	});

	app.post('/deleteUser', function(req,res){
		User.findOneAndUpdate({'_id': req.body.userID}, {"deleted":true})
			.exec(function(err, doc){
				if (err || doc == null){
					console.log(err);
					res.json({
						result:'whoops couldn\'t find that user'
					});
				} else {
					res.json({
						result:'user: '+ doc._id +' deleted'
					});
				}
			});
	});

	app.post('/newEvent', function(req,res){

		var userInformation = readToken(req.headers.token);

		var eventObject = req.body;
		eventObject.creator = userInformation._id;

		var getZip = req.body.zip;
		console.log('get zip: '+getZip);
		var googleUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+getZip+'&key=AIzaSyBOo3mntkfMMomnO0V0P6Mt4bQ3vMUUWIw';

		console.log('eventObject coming up ....................');
		console.log(eventObject);

		request(googleUrl, function (error, response, body) {
			if (!error && response.statusCode == 200) {

				var results = JSON.parse(body.results[0].geometry.location);

				var lat = results.lat;
				var long = results.lng;

				eventObject.loc = [lat,long];

				console.log('eventObject coming up ....................');
				console.log(eventObject);
				// var newevent = new Event(eventObject);
                //
				// newevent.save(function (err, eventInfo) {
				// 	if (err || eventInfo == null) return res.status(401).send(err);
				// 	res.status(201).json({
				// 		result:'event: '+eventInfo._id+' has been added'
				// 	});
				// });


			} else {
				console.log('Error: '+error);
				res.status(401).json({
					result:'oops!'
				});
			}
		});






	});

	app.post('/updateEvent', function(req,res){
		Event.findOneAndUpdate({'_id': req.body.eventID}, req.body.changes)
			.exec(function(err, doc){
				if (err || doc == null){
					console.log(err);
					res.status(401).json({
						result:'whoops couldn\'t find that user'
					});
				} else {
					res.status(201).json({
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
			{
				$and: [
					{'_id': req.body.userID},
					{'friends.accepted':{$ne:req.body.friendID}},
					{'friends.requested':{$ne:req.body.friendID}}
				]
			},
			{
				$push: {
					'friends.requested':req.body.friendID
				}
			}
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
	})

	app.post('/removeFriend', function(req,res){
		User.findOneAndUpdate({'_id': req.body.userID}, {$push: {'friends.removed':req.body.friendID}})
			.exec(function(err, doc){
				if (err || doc == null){
					console.log(err);
					res.json({
						result:'no user'
					});
				} else {
					User.findOneAndUpdate({'_id': req.body.friendID}, {$push:{'friends.removed':req.body.userID}})
						.exec(function(err, doc){
							if (err || doc == null){
								console.log(err);
								res.json({
									result:'no user'
								});
							} else {
								User.findOneAndUpdate({'_id': req.body.userID}, {$pull: {'friends.accepted':req.body.friendID}})
									.exec(function(err, doc){
										if (err || doc == null){
											console.log(err);
											res.json({
												result:'no user'
											});
										} else {
											User.findOneAndUpdate({'_id': req.body.friendID}, {$pull:{'friends.accepted':req.body.userID}})
												.exec(function(err, doc){
													if (err || doc == null){
														console.log(err);
													} else {
														res.json({
															result:'friend removed from user: '+doc._id
														});
													}
												});
										}
									});
							}
						});
				}
			});
	});

};