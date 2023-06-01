const express = require("express"); 
const LoginRequire = require("../Middleware/LoginRequire.js");
const Post = require("../Model/Post.js");
const User = require("../Model/User.js");
const router = express.Router();

router.get("/userProfile/:id", LoginRequire, async (req, res) => {
    const {id} = req.params
    const user = await User.findOne({_id: id})
    const usersPost = await Post.find({postedBy: id}).populate("postedBy", "_id name");
    res.json({user: user, usersPost: usersPost});
});

module.exports = router;