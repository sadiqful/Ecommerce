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

    res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json(error)
    }
});


module.exports = router