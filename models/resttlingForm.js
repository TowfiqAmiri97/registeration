const mongoose = require('mongoose');

const resttlingFormsSchema = mongoose.Schema({
    user_email: {
        type: String,
        required: true
    },
    religious_minority: {
        type: String,
        // default: ''
        // required: true,
    },
    ethnic_minority: {
        type: String,
        // default: ''
        // required: true,
    },
    women_at_risk: {
        type: String,
        // default: ''
        // required: true,
    },
    US_government_affiliate: {
        type: String,
        // default: ''
        // required: true,
    },
    journalist: {
        type: String,
        // default: ''
        // required: true,
    },
    HRDs: {
        type: String,
        // default: ''
        // required: true,    
    },
    civil_society: {
        type: String,
        // default: ''
        // required: true,
    },
    other: {
        type: String,
        // default: ''
        // required: true,
    },
    hosting_or_housing: {
        type: String,
        // default: ''

        // required: true,
    },
    hiring: {
        type: String,
        // default: ''

        // required: true,
    },
    donating: {
        type: String,
        // default: ''

        // required: true,
    },
    investing: {
        type: String,
        // default: ''

        // required: true,
    },
    ages: {
        type: String,
        // default: ''

        // required: true,
    },
    people_number: {
        type: String,
        // default: ''

        // required: true,
    },
    application_title: {
        type: String,
        // default: ''

        // required: true,
    },
    confirm_percentage: {
        type: String,
        // default: ''
        // required: true,
    },
    
});

const ResttlingFormsSchema = mongoose.model('resttling_forms_schema', resttlingFormsSchema)
module.exports =  ResttlingFormsSchema;
