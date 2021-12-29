const express = require('express');
const router = express.Router();

const ResttlingFormsSchema = require('../models/resttlingForm')
const SeekingFormsSchema = require('../models/seekingForm')

const ResttlingRegister = require('../models/ResttlingUser');
const SeekingRegister = require('../models/SeekingUser');
const MatchedUser = require('../models/MatchedUser');

const date = new Date();
const YYYY = date.getFullYear();
const MM = date.getMonth();
const DD = date.getDate();
let customeDate = `${YYYY}-${MM}-${DD}`

let arrayIndex = [];
let percentage = [];
let object = {};
router.get('/form', (req, res) => {
    ResttlingRegister.find({}) 
        .then((users) => {
            if (users) {
                let UEmail = users.email;
                ResttlingFormsSchema.find({UEmail}) 
                    .then((userForm) => {
                        let lengthIndex = 0;;
                        for ( lengthIndex; lengthIndex < userForm.length; lengthIndex++) {
                            
                            const matchedEmail = [];
                            const matchPercentage = [];
                        if (userForm[lengthIndex]) {
                            if (userForm[lengthIndex].religious_minority != undefined) arrayIndex.push( userForm[lengthIndex].religious_minority);
                            if (userForm[lengthIndex].ethnic_minority != undefined)arrayIndex.push( userForm[lengthIndex].ethnic_minority);
                            if (userForm[lengthIndex].women_at_risk != undefined)arrayIndex.push( userForm[lengthIndex].women_at_risk);
                            if (userForm[lengthIndex].US_government_affiliate != undefined)arrayIndex.push( userForm[lengthIndex].US_government_affiliate);
                            if (userForm[lengthIndex].journalist != undefined)arrayIndex.push( userForm[lengthIndex].journalist);
                            if (userForm[lengthIndex].HRDs != undefined) arrayIndex.push( userForm[lengthIndex].HRDs);
                            if (userForm[lengthIndex].civil_society != undefined) arrayIndex.push( userForm[lengthIndex].civil_society);
                            if (userForm[lengthIndex].other != undefined) arrayIndex.push( userForm[lengthIndex].other);
                            if (userForm[lengthIndex].hosting_or_housing != undefined) arrayIndex.push( userForm[lengthIndex].hosting_or_housing);
                            if (userForm[lengthIndex].hiring != undefined) arrayIndex.push( userForm[lengthIndex].hiring);
                            if (userForm[lengthIndex].donating != undefined) arrayIndex.push( userForm[lengthIndex].donating);
                            if (userForm[lengthIndex].investing != undefined) arrayIndex.push( userForm[lengthIndex].investing);
                            if (userForm[lengthIndex].ages != undefined) arrayIndex.push( userForm[lengthIndex].ages);
                            if (userForm[lengthIndex].people_number != undefined) arrayIndex.push( userForm[lengthIndex].people_number);
                            
                            let Index = lengthIndex;
                            
                            SeekingFormsSchema.find({ arrayIndex })
                                .then((matchedSeeker) => {
                                    let matchPerIndex = 0;
                                    
                                    matchedSeeker.map((MSeeker) => {
                                        
                                        if (userForm[Index].religious_minority != undefined && MSeeker.religious_minority != undefined) {
                                            matchPerIndex += 7.15;
                                        };
                                        if (userForm[Index].women_at_risk != undefined &&  MSeeker.women_at_risk != undefined) {
                                            matchPerIndex += 7.15;
                                        };
                                        if (userForm[Index].ethnic_minority != undefined && MSeeker.ethnic_minority != undefined) {
                                            matchPerIndex += 7.15;
                                        }
                                        if ( userForm[Index].US_government_affiliate != undefined && MSeeker.US_government_affiliate != undefined) {
                                            matchPerIndex += 7.15;
                                        }
                                        if (userForm[Index].journalist != undefined && MSeeker.journalist != undefined) {
                                            matchPerIndex += 7.15;
                                        }
                                        if (userForm[Index].HRDs != undefined && MSeeker.HRDs != undefined) {
                                            matchPerIndex += 7.15;
                                        }
                                        if (userForm[Index].civil_society != undefined && MSeeker.civil_society != undefined) {
                                            matchPerIndex += 7.15;
                                        }
                                        if (userForm[Index].other != undefined && MSeeker.other != undefined) {
                                            matchPerIndex += 7.15;
                                        }
                                        if (!userForm[Index].hosting_or_housing != undefined && MSeeker.hosting_or_housing != undefined) {
                                            matchPerIndex += 7.15;
                                        }
                                        if (userForm[Index].hiring != undefined && MSeeker.hiring != undefined) {
                                            matchPerIndex += 7.15;
                                        }
                                        if (userForm[Index].donating != undefined && MSeeker.donating != undefined) {
                                            matchPerIndex += 7.15;
                                        }
                                        if (userForm[Index].investing != undefined && MSeeker.investing != undefined) {
                                            matchPerIndex += 7.15;
                                        }
                                        if (userForm[Index].ages != undefined && MSeeker.ages != undefined) {
                                            matchPerIndex += 7.15;
                                        }
                                        if (userForm[Index].people_number != undefined && MSeeker.people_number != undefined) {
                                            matchPerIndex += 7.15;
                                        }
                                        
                                        matchedEmail.push(MSeeker.user_email);
                                        matchPercentage.push(Math.ceil(matchPerIndex));
                                       
                                        if (matchedEmail.length+1 != lengthIndex ) {
                                            if (matchedEmail.length == lengthIndex) {
                                                const firstName = users[Index].firstName;
                                                const lastName = users[Index].lastName;
                                                const fullName = `${firstName} ${lastName}`
                                                let email = users[Index].email;
                                                let MPerec = matchPercentage.toString();
                                                let MEmail = matchedEmail.toString();
                                                
                                                const saveMatchedUser = new MatchedUser({
                                                        name: fullName,
                                                        matchPercentage: MPerec,
                                                        matchedSeekers: MEmail,
                                                        email: email,
                                                        date: customeDate
                                                    })
                                                    saveMatchedUser.save()
                                                    .then(form => {
                                                    //   console.log(`${form}\n`)
                                                    })
                                                    .catch(err => console.log(err));
                                            }
                                                
                                          
                                        }
                                        matchPerIndex = 0;
                                    })
                                    
                                })
                                .catch(err => console.log(err));
                            }
                            
                            }
                        })
                        .catch(err => console.log(err));
                    }
                    
                    
                })
                .catch(err => console.log(err));
                MatchedUser.find({ })
                .then((user) => {
                
                res.render('list', { 'users': user } );
            })
        })
module.exports = router;