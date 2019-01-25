import Joi from 'joi';

function validateMeetup(meetup) {
    const schema = {
        location: Joi.string().min(4).required(),
        topic: Joi.string().min(5).required(),
        description: Joi.string().required(),
        happeningOn: Joi.date().required(),
        image: Joi.array().required(),
        tag: Joi.array().required()
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
function validateQuestion(question) {
    const schema = {
        createdBy: Joi.number().required(),
        title: Joi.string().min(5).required(),
        body: Joi.string().min(10).required()
    };
    return Joi.validate(question, schema);
}

export { validateMeetup, validateRsvp, validateQuestion };