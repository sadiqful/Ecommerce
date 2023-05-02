const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        desc: {type: String, required: true },
        img: {type: String, required: true},
        categories: {type: Array, required: false},
        size: {type: String},
        color: {type: String},
        price: {type: Number, required: false},
    },

    {timestamps: true },
);

module.exports = mongoose.model("Product", ProductSchema)