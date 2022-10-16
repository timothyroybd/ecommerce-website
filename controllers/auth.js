
const User = require("../models/user")
const {check, validationResult} = require("express-validator")


exports.signup = (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body);
    user.save((err,user) => {
        if(err){
            console.log(err.message)
            return res.status(400).json({
                err: err.message
            });
        }
        res.json({
            name: user.name,
            email: user.email, 
            id: user._id
        })
    })
}

exports.signin = (req,res) => {
    const {email, password} = req.body;

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    User.findOne({email}, (err, user) => {
        if(err){
            res.status(400).json({
                error: "USER email does not exist"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and pass do not match"
            })
        }
    })
}

exports.signout = (req,res)=> {
    res.json({
        message: "User signout"
    }) }
