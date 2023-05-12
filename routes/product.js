const router = require("express").Router();
const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// CREATE PRODUCT

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE PRODUCT

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
    
        const updatedProduct = Product.findByIdAndUpdate(
        req.params.id, {$set: req.body}, {new: true }    
    );
    
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE PRODUCT

router.delete("/:id", verifyAndAuthorization, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");

    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = router