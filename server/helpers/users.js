import Joi from 'joi';
import jwt from 'jsonwebtoken';

function validateUser(user) {
    const schema = {
        firstname: Joi.string().min(5).required(),
        lastname: Joi.string().min(5).required(),
        othername: Joi.string(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        phoneNumber: Joi.number().required(),
        username: Joi.string().min(5).required(),
        password: Joi.string().min(8).required(),
        registered: Joi.date(),
        isAdmin: Joi.boolean().required()
    };
    return Joi.validate(user, schema);
}
function validateLogin(user) {
    const schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().min(8).required()
    };
    return Joi.validate(user, schema);
}

function generateToken(data) {
    const token = jwt.sign(data,
      process.env.SECRET, { expiresIn: '7d' });
    return token;
  }

export { validateUser, validateLogin, generateToken };