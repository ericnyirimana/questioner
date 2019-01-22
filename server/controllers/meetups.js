import {
addMeetup, meetups, addRsvp, rsvps
} from '../models/meetups';
import {
    validateMeetup, validateRsvp
    } from '../helpers/meetups';

class meetupController {
// get meetups
static get_meetups(req, res) {
    const data = [];
    meetups.forEach((meetup) => {
    delete meetup['createdOn'];
    delete meetup['images'];
    delete meetup['description'];
    data.push(meetup);
    });
    const response = { status: 200, data };
    res.send(response);
}

static get_upcoming_meetups(req, res) {
    meetups.sort(function (a, b) {
        return new Date(a.happeningOn) - new Date(b.happeningOn);
    });
    const data = [];
    meetups.forEach((meetup) => {
    if (new Date(meetup.happeningOn) >= new Date()) {
    delete meetup['createdOn'];
    delete meetup['images'];
    delete meetup['description'];
    data.push(meetup);
    }
    });
    const response = { status: 200, data };
    res.send(response);
}

static get_specific_meetups(req, res) {
const meetup = meetups.find(m => m.id === parseInt(req.params.id));
if (!meetup) {
return res.status(404).send({
status: 404,
error: 'Meetup ID was not found'
});
}
const response = {
status: 200,
    data: [{
            id: meetup.id,
            topic: meetup.topic,
            location: meetup.location,
            happeningOn: meetup.happeningOn,
            tags: meetup.tags
        }]
    };
    res.send(response);
}

static post_meetups(req, res) {
    const {
        error
    } = validateMeetup(req.body);
if (error) {
return res.status(400).send({
status: 400,
error: error.details[0].message
    });
}
const meetup = {
    id: meetups.length + 1,
    createdOn: new Date().toISOString().replace('T', ' ').replace(/\..*$/, ''),
    location: req.body.location,
    images: req.body.images,
    topic: req.body.topic,
    description: req.body.description,
    happeningOn: req.body.happeningOn,
    tags: req.body.tags,
};
meetups.push(meetup);
    if (meetups !== '') {
        addMeetup(meetups);
        const response = {
            status: 200,
            data: [{
                topic: req.body.topic,
                location: req.body.location,
                happeningOn: req.body.happeningOn,
                tags: req.body.tags
            }]
        };
        res.send(response);
    }
}

static post_rsvp(req, res) {
    // Validate Data
    const {
        error
    } = validateRsvp(req.body);
    if (error) {
        return res.status(400).send({
        status: 400,
        error: error.details[0].message
    });
}
    if (!meetups.find(m => m.id === parseInt(req.params.id))) {
        return res.status(404).send('Meetup ID was not found');
    }
    const {
        topic
    } = meetups.find(m => m.id === parseInt(req.params.id));

    const rsvp = {
        id: rsvps.length + 1,
        meetup: req.params.id,
        user: req.body.user,
        response: req.body.response,
    };
    rsvps.push(rsvp);
    if (rsvps !== '') {
        addRsvp(rsvps);
        const response = {
            status: 200,
            data: [{
                meetup: req.body.meetup,
                topic,
                status: req.body.response,
            }]
        };
        res.send(response);
    }
}
}

export default meetupController;