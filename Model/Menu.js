const mongoose = require('mongoose');
const menu = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {    
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ["Veg", "Non-Veg", "Beverages"],
        required: true
    },
    ingredients: {
        type: String,
        required: true
    }
});
const Menu = mongoose.model("Menu", menu);
module.exports = Menu;