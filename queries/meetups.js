const fs = require('fs');
// GET MEETUP LIST
let meetupsList = [];
const meetupdata = "../data/meetups.json";
try{
    meetupsList = require(meetupdata);
} catch(err) {
    meetupsList = [];
}
let rsvpsList = [];
const rsvpData = "../data/rsvp.json";
try{
    rsvpsList = require(rsvpData);
} catch(err) {
    rsvpsList = [];
}

// Create mettups
function addMeetup(data) {
fs.writeFile("./data/meetups.json", JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
});
}
// Add rsvp
function addRsvp(data) {
    fs.writeFile("./data/rsvp.json", JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
    });
    }
//
module.exports = {
    addMeetup,
    meetups: meetupsList,
    addRsvp,
    rsvps: rsvpsList,

};