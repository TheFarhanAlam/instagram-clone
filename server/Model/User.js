const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    followers: [{type: ObjectId, ref: "User"}],
    followings: [{type: ObjectId, ref: "User"}]
});

userSchema.pre("save", async function(next){
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;