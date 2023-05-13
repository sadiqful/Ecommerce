const router = require("express").Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
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

// Update a cart - All users with verified token and authorization should be able to update their cart

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, {$set: req.body}, {new: true});
            res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete a cart - All users with verified token and authorization should be able to delete their cart

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart deleted!!")
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get a cart - All users with verified token and authorization should be able to get their cart

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router