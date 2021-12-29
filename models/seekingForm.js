const mongoose = require('mongoose');

const seekingFormsSchema = mongoose.Schema({
    user_email: {
        type: String,
        required: true
    },
    religious_minority: {
        type: String,
        // required: true,
    },
    ethnic_minority: {
        type: String,
        // required: true,
    },
    women_at_risk: {
        type: String,
        // required: true,
    },
    US_government_affiliate: {
        type: String,
        // required: true,
    },
    journalist: {
        type: String,
        // required: true,
    },
    HRDs: {
        type: String,
        // required: true,    
    },
    civil_society: {
        type: String,
        // required: true,
    },
    other: {
        type: String,
        // required: true,
    },
    hosting_or_housing: {
        type: String,
        // required: true,
    },
    hiring: {
        type: String,
        // required: true,
    },
    donating: {
        type: String,
        // required: true,
    },
    investing: {
        type: String,
        // required: true,
    },
    ages: {
        type: String,
        // required: true,
    },
    people_number: {
        type: String,
        // required: true,
    },
    application_title: {
        type: String,
        // required: true,
    },
    confirm_percentage: {
        type: String,
        // required: true,
    },
    
});

const SeekingFormsSchema = mongoose.model('seeking_forms_schema', seekingFormsSchema)


module.exports = SeekingFormsSchema;