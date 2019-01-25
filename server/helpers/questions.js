import Joi from 'joi';

function validatecomment(meetup) {
    const schema = {
        comment: Joi.string().min(4).required(),
        user_id: Joi.number().required()
    };
    return Joi.validate(meetup, schema);
}

export { validatecomment };