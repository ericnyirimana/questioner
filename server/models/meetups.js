import fs from 'fs';
import rsvpData from '../../data/rsvp.json';
import meetupdata from '../../data/meetups.json';
import questiondata from '../../data/questions.json';

// GET MEETUP LIST
let meetupsList = [];
try {
    meetupsList = meetupdata;
} catch (err) {
    meetupsList = [];
}
let rsvpsList = [];
try {
    rsvpsList = rsvpData;
} catch (err) {
    rsvpsList = [];
}
// GET QUESTION LIST
let questionsList = [];
try {
    questionsList = questiondata;
} catch (err) {
    questionsList = [];
}
// Create mettups
function addMeetup(data) {
    fs.writeFile('././data/meetups.json', JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
    });
}
// Add rsvp
function addRsvp(data) {
    fs.writeFile('././data/rsvp.json', JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
    });
}
// Create Question
function addQuestion(data) {
    fs.writeFile('././data/questions.json', JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
    });
}
export {
addMeetup, meetupsList as meetups, addRsvp, rsvpsList as rsvps, addQuestion, questionsList
};