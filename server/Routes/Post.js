const express = require("express");
const Post = require("../Model/Post.js");
const LoginRequire = require("../Middleware/LoginRequire.js");
const router = express();

router.get("/allpost", LoginRequire, async (req, res)=>{
    const posts = await Post.find().populate("postedBy", "_id name email").populate("comments.postedBy", "_id name")
    res.json({posts});
});
router.post("/createpost",LoginRequire, async (req, res)=>{
    const {title, pic, body} = req.body;
    if (!title || !body || !pic) {
        return res.status(422).json({error: "Please fill all feilds"});
    }
    const post = new Post({
        title: title,
        body: body,
        photo: pic,
        postedBy: req.user
    })
    const result = await post.save();
    res.json(result);
});
router.get("/mypost", LoginRequire, async (req, res)=>{
    const myPost = await Post.find({postedBy: req.user._id}).populate("postedBy", "_id name");
    res.json({myPost});
});
router.put("/like", LoginRequire, async (req, res)=>{
    const result = await Post.findByIdAndUpdate(req.body.postId, {
        $push: {likes: req.user._id}
    }, {
        new: true
    })
    res.json({result});
});
router.put("/unlike", LoginRequire, async (req, res)=>{
    const result = await Post.findByIdAndUpdate(req.body.postId, {
        $pull: {likes: req.user._id}
    }, {
        new: true
    })
    res.json({result});
});
router.put("/comment", LoginRequire, async (req, res)=>{
    const comment = {
        text: req.body.text,
        postedBy: req.user
    };
    const result = await Post.findByIdAndUpdate(req.body.postId, {
        $push: {comments: comment}
    }, {
        new: true
    }).populate("comments.postedBy", "_id name");
    res.json({result});
});
router.delete("/delete/:postId", LoginRequire, async (req, res) => {
    const post = await Post.findOne({_id: req.params.postId})
    .populate("postedBy", "id");
    if (!post) {
        return res.status(422).json({error: "Post not present"});
    }
    const result = await post.deleteOne();
    res.json({result: result});
});

module.exports = router