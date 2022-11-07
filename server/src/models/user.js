const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName:{
        type: String,
        unique: true
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    password:{
        type: String,
        required: true,
        minlenght:6,
    },
    admin:{
        type: Boolean,
        default: false
    }
}, {timestamps: true}
)
module.exports = mongoose.model("user", userSchema);