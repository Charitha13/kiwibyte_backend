const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    category:{
        type: String,
        required: true,
        trim:true,
    },   
    photo: String,

    description: {
        type: String,
        trim: true,
        required: true,
    },
    created:{
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("Topic",topicSchema);