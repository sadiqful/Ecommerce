const router = require("express").Router();
const CryptoJs = require("crypto-js");
const User = require("../models/User");

//REGISTRATION

router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    try {

        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
        
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;