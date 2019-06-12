const crypto = require('crypto');
const Friend = require('../models/friend.model');

exports.test = function (req, res) {
    res.json({greet: "Greeting from the friend Controller"});
};

exports.validate = function (req, res){
    res.json({user: req.body.username, pass: hashPassword(req.body.password)});
}


exports.add_friend = function (req, res) {
    let friend = new Friend(
        {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    );
    friend.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Friend Created successfully')
    })
};

exports.find_friend = function(req, res){
    const name = req.body.friend;
    Friend.findOne({name: /name/}, (err, friend)=>{
        if (err) return next (err);
        if(friend === null){
            res.json('No friends by that name');
        }
        res.json(friend);
    })
}

// The purpose of this function is to convert a string to an md5 hash of the string
function hashPassword(str){
    return crypto.createHash('md5').update(str).digest("hex");
}  