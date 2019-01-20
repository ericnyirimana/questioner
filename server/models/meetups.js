import fs from 'fs';
import rsvpData from '../../data/rsvp.json';
import meetupdata from '../../data/meetups.json';
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
//
export {
addMeetup, meetupsList as meetups, addRsvp, rsvpsList as rsvps
};