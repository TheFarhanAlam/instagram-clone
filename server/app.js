const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Auth = require("./Routes/Auth.js");
const Post = require("./Routes/Post.js");
const User = require("./Routes/User.js");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/userDB")
.then(() => {
    console.log("Database connected successfully");
})
.catch((error)=>{
    console.log(error);
})

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use("/", Auth);
app.use("/post", Post);
app.use("/user", User);

app.listen(8000, () => {
    console.log("Listening on the port 8000");
});