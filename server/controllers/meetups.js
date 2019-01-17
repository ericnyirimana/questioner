const express = require('express');
const Joi = require('joi');

const router = express.Router();
const { addMeetup } = require('../models/meetups');
const { meetups } = require('../models/meetups');
const { addRsvp } = require('../models/meetups');
const { rsvps } = require('../models/meetups');

router.get('/', (req, res) => {
    const data = []; meetups.forEach((meetup) => {
delete meetup['createdOn'];
delete meetup['images'];
delete meetup['description'];
data.push(meetup);
});
const response = { status: 200, data };
res.send(response);
});
router.get('/upcoming', (req, res) => {
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
});
router.get('/:id', (req, res) => {
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
});
function validateMeetup(meetup) {
    const schema = {
        location: Joi.string().min(4).required(),
        images: Joi.array().required(),
        topic: Joi.string().min(5).required(),
        description: Joi.string().required(),
        happeningOn: Joi.date().required(),
        createdOn: Joi.date(),
        tags: Joi.array()
    };
    return Joi.validate(meetup, schema);
}
router.post('/', (req, res) => {
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
});

function validateRsvp(rsvp) {
    const schema = {
        user: Joi.number().required(),
        response: Joi.string().required()
    };
    return Joi.validate(rsvp, schema);
}
router.post('/:id/rsvps', (req, res) => {
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
});

module.exports = router;