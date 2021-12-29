const express = require('express');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const SeekingFormsSchema = require('../models/seekingForm')
const ResttlingFormsSchema = require('../models/resttlingForm')

const router = express.Router();


router.get('/seekingRegister/form', (req, res) => { 
    res.render('indexForm', { 'path': '/user_form/seekingRegister/form'})
})

router.get('/resttlingRegister/form', (req, res) => {
    res.render('indexForm', { 'path': '/user_form/resttlingRegister/form' })
})

router.post('/seekingRegister/form', (req, res) => {
    const errors = [];
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        const user_email = fields.user_email;
        const religious_minority = fields.religious_minority;
        const ethnic_minority = fields.ethnic_minority;
        const women_at_risk = fields.women_at_risk;
        const US_government_affiliate = fields.US_government_affiliate;
        const journalist = fields.journalist;
        const HRDs = fields.HRDs;
        const civil_society = fields.civil_society;
        const other = fields.other;
        const hosting_or_housing = fields.hosting_or_housing;
        const hiring = fields.hiring;
        const donating = fields.donating;
        const investing = fields.investing;
        const ages = fields.ages;
        const people_number = fields.people_number;
        const application_title = fields.application_title;
        const confirm_percentage = fields.confirm_percentage;

        
        const newForm = new SeekingFormsSchema({
            user_email,
            religious_minority,
            ethnic_minority,
            women_at_risk,
            US_government_affiliate,
            journalist,
            HRDs,
            civil_society,
            other,
            hosting_or_housing,
            hiring,
            donating,
            investing,
            ages,
            people_number,
            application_title,
            confirm_percentage
        })
        newForm.save()
        .then(form => {
            res.render('dashboard', { 'email': user_email })
        })
        .catch(err => console.log(err));

    });
});


router.post('/resttlingRegister/form', (req, res) => {
    const errors = [];
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        const user_email = fields.user_email;
        const religious_minority = fields.religious_minority;
        const ethnic_minority = fields.ethnic_minority;
        const women_at_risk = fields.women_at_risk;
        const US_government_affiliate = fields.US_government_affiliate;
        const journalist = fields.journalist;
        const HRDs = fields.HRDs;
        const civil_society = fields.civil_society;
        const other = fields.other;
        const hosting_or_housing = fields.hosting_or_housing;
        const hiring = fields.hiring;
        const donating = fields.donating;
        const investing = fields.investing;
        const ages = fields.ages;
        const people_number = fields.people_number;
        const application_title = fields.application_title;
        const confirm_percentage = fields.confirm_percentage;

        
        const newForm = new ResttlingFormsSchema({
            user_email,
            religious_minority,
            ethnic_minority,
            women_at_risk,
            US_government_affiliate,
            journalist,
            HRDs,
            civil_society,
            other,
            hosting_or_housing,
            hiring,
            donating,
            investing,
            ages,
            people_number,
            application_title,
            confirm_percentage
        })
        newForm.save()
        .then(form => {
            res.render('dashboard', { 'email': user_email })
        })
        .catch(err => console.log(err));

    });
});

module.exports = router;