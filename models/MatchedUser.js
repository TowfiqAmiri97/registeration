const mongoose = require('mongoose');


const date = new Date();
const YYYY = date.getFullYear();
const MM = date.getMonth();
const DD = date.getDate();
let customeDate = `${YYYY}-${MM}-${DD}`
//  console.log(customeDate);

const matchedUser = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    email: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: customeDate,
    },
     matchedSeekers: {
        type: String,
    },
    matchPercentage: {
        type: String,
        default: 0
    }
});

const MatchedUser = mongoose.model('matched_user', matchedUser)

module.exports =  MatchedUser;