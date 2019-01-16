const express = require('express');
const Joi = require('joi');
const fs = require('fs');

const router = express.Router();
const { addUser } = require('../models/users');
const { users } = require('../models/users');

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
router.post('/', (req, res) => {
    // Validate Data
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });
    const user = {
        id: users.length + 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        othername: req.body.othername,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        password: req.body.password,
        registered: new Date().toISOString().replace('T', ' ').replace(/\..*$/, ''),
        isAdmin: req.body.isAdmin
    };
    console.log(user);
    users.push(user);
if (users !== '') {
addUser(users);
const response = {
status: 200,
data: [{
firstname: req.body.firstname,
lastname: req.body.lastname,
othername: req.body.othername,
email: req.body.email,
phoneNumber: req.body.phoneNumber,
username: req.body.username,
isAdmin: req.body.isAdmin
 }]
        };
        res.send(response);
}
    });

module.exports = router;