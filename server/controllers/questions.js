import Joi from 'joi';
import {
addQuestion, questions, downvotes, upvotes
} from '../models/questions';

function validateQuestion(question) {
    const schema = {
        createdBy: Joi.number().required(),
        meetup: Joi.number().required(),
        title: Joi.string().min(5).required(),
        body: Joi.string().min(10).required()
    };
    return Joi.validate(question, schema);
}

class questionController {
static welcome_message(req, res) {
    res.json({
        message: 'WELCOME TO QUESTIONER'
    });
}

static downvote_question(req, res) {
    const arrIndex = questions.findIndex(q => q.id === parseInt(req.params.id));
    const question = questions.find(q => q.id === parseInt(req.params.id));
    if (!question) {
        res.status(404).send({
    status: 404,
        error: 'Question ID was not found'
    });
}
    questions[arrIndex].votes--;
    downvotes(questions);
    const response = {
        status: 200,
        data: [{
            meetup: question.meetup,
            title: question.title,
            body: question.body,
            votes: question.votes
        }]
    };
    res.send(response);
}

static upvote_question(req, res) {
    const arrIndex = questions.findIndex(q => q.id === parseInt(req.params.id));
    const question = questions.find(q => q.id === parseInt(req.params.id));
    if (!question) {
        res.status(404).send({
        status: 404,
        error: 'Question ID was not found'
    });
}
    questions[arrIndex].votes++;
    upvotes(questions);
    const response = {
        status: 200,
        data: [{
            meetup: question.meetup,
            title: question.title,
            body: question.body,
            votes: question.votes
        }]
    };
    res.send(response);
}

static post_question(req, res) {
    const {
        error
    } = validateQuestion(req.body);
    if (error) {
        return res.status(400).send({
        status: 400,
        error: error.details[0].message
    });
}
    const question = {
        id: questions.length + 1,
        createdOn: new Date().toISOString().replace('T', ' ').replace(/\..*$/, ''),
        createdBy: req.body.createdBy,
        meetup: req.body.meetup,
        title: req.body.title,
        body: req.body.body,
        votes: 0
    };
    questions.push(question);
    if (questions !== '') {
        addQuestion(questions);
        const response = {
            status: 200,
            data: [{
                user: req.body.createdBy,
                meetup: req.body.meetup,
                title: req.body.title,
                body: req.body.body
            }]
        };
        res.send(response);
    }
}
}

export default questionController;