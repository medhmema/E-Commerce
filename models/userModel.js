const mongoose = require('mongoose');
const { isEmail } = require('validator');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [3, '{PATH} should contain at least ({MINLENGTH}) characters.'],
        maxlength: [20, '{PATH} should contain at most ({MAXLENGTH}) characters.'],
        unique: true,
        trim: true
    },

    password: {
        type: String
    },

    name: {
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [3, '{PATH} should contain at least ({MINLENGTH}) characters.'],
        maxlength: [20, '{PATH} should contain at most ({MAXLENGTH}) characters.']
    },

    firstName: {
        type: String,
        required: [true, '{PATH} is required'],
        minlength: [3, '{PATH} should contain at least ({MINLENGTH}) characters.'],
        maxlength: [20, '{PATH} should contain at most ({MAXLENGTH}) characters.']
    },

    phoneNumber: {
        type: Number,
        required: [true, '{PATH} is required'],
        min: [10000000, '{PATH} should contain 8 digits.'],
        max: [99999999, '{PATH} should contain 8 digits.'],
        unique: true
    },

    email: {
        type: String,
        required: [true, "{PATH} is required"],
        validate: [isEmail],
        unique: true
    },

    role: {
        type: String
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

    postalCode: {
        type: Number,
        min: [1000, "{PATH} should contain 4 digits"],
        max: [9999, "{PATH} should contain 4 digits"],
    },

    verified: {
        type: Boolean,
        default: false
    },

    savedAnnouncements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Announcement"
    }],

    likes: {
        type: [String]
    },
    
    dislikes: {
        type: [String]
    },

    likers: {
        type: [String]
    },

    dislikers: {
        type: [String]
    },
},
    {
        timestamps: true,
    });

module.exports = mongoose.model("User", userSchema);