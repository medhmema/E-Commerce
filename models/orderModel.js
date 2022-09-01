const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    announcement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Announcement",
        required: true
    },

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    state: { //waiting, confirmed and declined.
        type: String,
        default: "waiting"
    }
},
    {
        timestamps: true,
    });
    
module.exports = mongoose.model("Order", orderSchema);