const express = require('express');
const Joi = require('joi');
const fs = require('fs');
const router = express.Router();
let {addQuestion} = require('../queries/questions');
let {questions} = require('../queries/questions');
router.get('/', (req, res)=> {
    res.json({
        message: 'WELCOME TO QUESTIONS'
    })
});
router.post('/', (req, res) => {
    const { error } = validateQuestion(req.body);
    if(error) return res.status(400).send({ "status":400, "error":error.details[0].message});
    const question = {
        id: questions.length +1,
        createdOn: new Date().toISOString().replace('T', ' ').replace(/\..*$/, ''),
        createdBy: req.body.createdBy,
        meetup: req.body.meetup,
        title: req.body.title,
        body: req.body.body,
        votes: 0
    };

    questions.push(question);
    if(questions != "")
    {
        addQuestion(questions);
        let response = {
            "status" : 200,
            "data" : [{
                "user": req.body.createdBy,
                "meetup": req.body.meetup,
                "title": req.body.title,
                "body": req.body.body
            }]
        };
        res.send(response);
    }
});

function validateQuestion(question) {
    const schema = {
        createdBy: Joi.number().required(),
        meetup: Joi.number().required(),
        title: Joi.string().min(5).required(),
        body: Joi.string().min(10).required()
    };
    return Joi.validate(question, schema);
}
module.exports = router;