const router = require("express").Router();
const {
    verifyToken,
    verifyAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken"); 

const User = require("../models/User");

// EDIT

router.put("/:id", verifyAndAuthorization, async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    if (req.body.password) {
        req.body.password = hashPassword
    }

    try {

    const updatedUser = User.findByIdAndUpdate(
        req.params.id, {$set: req.body}, {new: true }
    );

    res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE

router.delete("/:id", verifyAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...")

    } catch (error) {
        res.status(500).json(error)
    }
});

// GET USER 

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
    
    const user = await User.findById(req.params.id);
    const { password, ...others} = user._doc;
    res.status(200).json(others);
    
    } catch (error) {
        res.status(500).json(error);
    }
});




module.exports = router