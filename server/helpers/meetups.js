import Joi from 'joi';

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
function validateRsvp(rsvp) {
    const schema = {
        user: Joi.number().required(),
        response: Joi.string().required()
    };
    return Joi.validate(rsvp, schema);
}

export { validateMeetup, validateRsvp };