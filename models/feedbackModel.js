const mongoose = require('mongoose');


const feedbackSchema = new mongoose.Schema({
    stars: {
        type: Number,
        required: [true, '{PATH} is required'],
        max: [5, "{PATH} should be ({max}) at most."]
    },

    message: {
        type: String,
    },

    feedbackedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true,
    });
    
module.exports = mongoose.model("Feedback", feedbackSchema);