const mongoose = require('mongoose');


const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [3, '{PATH} should contain at least ({MINLENGTH}) characters.'],
        maxlength: [30, '{PATH} should contain at most ({MAXLENGTH}) characters.']
    },

    category: {
        type: String,
        required: [true, "{PATH} is required"]
    },

    subCategory: {
        type: String,
        required: [true, "{PATH} is required"]
    },

    price: {
        type: Number,
        required: [true, "{PATH} is required"]
    },

    governorate: {
        type: String
    },

    city: {
        type: String
    },

    address: {
        type: String
    },

    description: {
        type: String
    },

    reports: {
        type: Number
    },

    images: {
        type: String
    },

    type: { //selling or renting
        type: String
    },

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},
    {
        timestamps: true,
    });

module.exports = mongoose.model("Announcement", announcementSchema);