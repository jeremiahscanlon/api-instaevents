// login
var json =
{
    "email": "kevin@gmail.com",
    "password": "password"
};


// request friend or accept friend (requestFriend, acceptFriend)
json =
{
    "userID": "577de66daa1a799e08491d0d",
    "friendID": "577ddd9cc87ac40d12c3faf9"
};

// user status with event (eventInvite, eventIn, eventOut, eventWatching)
json =
{
    "eventID": "57807b2ef43b505b2bfc1b15",
    "userID": "577defdb96f013fd139e18c6"
};

// edit an event (updateEvent)
json =
{
    "eventID": "57807b2ef43b505b2bfc1b15",
    "changes": {
        "location_name": "The Trop",
        "description": "The newest description that describes the event the best way that it can",
        "date_time": "2016-07-25 11:30:00.000Z"
    }
};

// edit a user (updateUser)
json =
{
    "userID": "57813ca491bae872338de45b",
    "changes": {
        "picture": "http://images.fashionnstyle.com/data/images/full/144022/jennifer-lawrence.jpg?w=600",
        "bio": "the second one, but no less important",
        "age": "31",
        "homezip": "01025",
        "workzip": "52632"
    }
};