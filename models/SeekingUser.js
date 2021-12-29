const mongoose = require('mongoose');


const date = new Date();
const YYYY = date.getFullYear();
const MM = date.getMonth();
const DD = date.getDate();



const seekingRegister = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,    
    },
    city: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: `${YYYY}-${MM}-${DD}`,
    },
    image: {
        type: String,
        required: true,
    },
     matchedSeekers: {
        type: String,
    },
    matchPercentage: {
        type: Number,
        default: 0
    }
});

const SeekingRegister = mongoose.model('seekingRegister', seekingRegister)


module.exports = SeekingRegister;
