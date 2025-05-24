const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90
    },
    longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }); 

const School = mongoose.model('School', schoolSchema);

module.exports = School;