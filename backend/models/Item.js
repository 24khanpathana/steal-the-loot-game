const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    image: {
        type: String, // URL or path to image/icon
        required: true,
    }
});

module.exports = mongoose.model('Item', ItemSchema);