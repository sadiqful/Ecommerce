const router = require("express").Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken")
const Order = require("../models/Order")

// Allow users with verified token to create order 

router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Allow admin to update order 

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, 
        {$set: req.body}, {new: true});
        res.status(200).json(updateOrder);
    } catch (error) {
        res.status(500).json(error);
    }
    
});



module.exports = router