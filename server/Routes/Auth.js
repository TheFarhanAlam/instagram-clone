const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/User.js");
const router = express.Router();

router.post("/signup", async (req, res)=>{
    const {name, email, password} = req.body;
    if (!email || !name || !password) {
       return res.status(422).json({error: "Please fill all credentials"})
    }
    const exist = await User.findOne({email: email});
    if (exist) {
       return res.status(422).json({message: "User Already Exists"});
    }
    const user = new User({
        name: name,
        email: email,
        password: password 
    })

    await user.save();
    res.json({user})
})
router.post("/signin", async (req, res)=>{
    const {email, password} = req.body;
    if (!email || !password) {
       return res.status(422).json({error: "Please fill all the credentials"})
    }
    const exist = await User.findOne({email: email});
    if (!exist) {
       return res.status(422).json({error: "Invalid email or password"});
    }
    const matchPassword = await bcrypt.compare(password, exist.password);
    if (matchPassword) {
    const token = await jwt.sign({_id: exist._id}, "hithereiamthebestintheworld");
    const {_id, name, email} = exist;
    res.json({token: token, user: {_id, name, email}});
    }else {
        res.status(422).send("Wrong Credentials");
    }
});

module.exports = router;