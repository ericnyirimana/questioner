const express = require('express');
const Joi = require('joi');
const router = express.Router();
let {addQuestion} = require('../queries/questions');
let {questions} = require('../queries/questions');
let {downvotes} = require('../queries/questions');
let {upvotes} = require('../queries/questions');
router.get('/', (req, res)=> {
    res.json({
        message: 'WELCOME TO QUESTIONER'
    })
});
router.patch('/:id/downvote', (req, res)=> {
    const arrIndex = questions.findIndex(q => q.id === parseInt(req.params.id));
    const question = questions.find(q => q.id === parseInt(req.params.id));
    if(!question) res.status(404).send({ "status":404, "error":"Question ID was not found"});
    questions[arrIndex].votes--;
        downvotes(questions);
        let response = {
            "status" : 200,
            "data" : [{
                "meetup": question.meetup,
                "title": question.title,
                "body": question.body,
                "votes": question.votes
            }]
        };
        res.send(response);
});
router.patch('/:id/upvote', (req, res)=> {
    const arrIndex = questions.findIndex(q => q.id === parseInt(req.params.id));
    const question = questions.find(q => q.id === parseInt(req.params.id));
    if(!question) res.status(404).send({ "status":404, "error":"Question ID was not found"});
    questions[arrIndex].votes++;
        upvotes(questions);
        let response = {
            "status" : 200,
            "data" : [{
                "meetup": question.meetup,
                "title": question.title,
                "body": question.body,
                "votes": question.votes
            }]
        };
        res.send(response);
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
    console.log(question);
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