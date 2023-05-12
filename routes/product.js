const router = require("express").Router();
const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// CREATE PRODUCT

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const createdProduct = new Product(req.body);

    try {
        const savedProduct = await createdProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router