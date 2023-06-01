const jwt = require("jsonwebtoken");
const User = require("../Model/User.js");

const auth = async (req, res, next) => {
    const Token = req.headers.authorization;
    if (!Token) {
        return res.status(401).json({error: "You must logged in"});
    }
    const payload = await jwt.verify(Token, "hithereiamthebestintheworld")
    const {_id} = payload;
    const userData = await User.findById({_id: _id});
    req.user = userData;
    next();
}

module.exports = auth