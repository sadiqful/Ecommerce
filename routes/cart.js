const router = require("express").Router();
const {
    verifyToken,
    verifyAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken")

const Cart = require("../models/Cart")

// Create a cart - All users with a verified token should be able to able to create a cart

router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error)
    }
});




module.exports = router