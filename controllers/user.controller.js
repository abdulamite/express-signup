const crypto = require('crypto');
const User = require('../models/user.model');

exports.userValidate = function (req, res){
    res.json(req.body);
}

exports.signUpForm = function (req, res){
    res.render('../views/user/sign_up');
}

exports.confirmPassword = function(req, res, next){
    if(req.body.password !== req.body.confirm){
        res.json({err: 'Looks like the passwords don\'t match up homie'});
    }
    req.body.hash = hashPassword(req.body.password);
    console.log(typeof req.body.hash);
    next();
}

exports.find_user = function(req, res, next){
    User.findOne({username:req.body.username}, (err,user)=>{
        if(err) console.log(err)
        if(user !== null){
            res.json({err:'That username is already taken'});
        }
        next();
    })
}

exports.createUser = function(req, res){
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        hash: req.body.hash
    });
    user.save(function(err){
        if(err) console.log(err)
        res.send('User Created Successfully')
    })
};

// The purpose of this function is to convert a string to an md5 hash of the string
function hashPassword(str){
    return crypto.createHash('sha1').update(str).digest("hex");
}  