import { questions, downvotes, upvotes } from '../models/questions';

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
    questions[arrIndex].downvotes++;
    downvotes(questions);
    const response = {
        status: 200,
        data: [{
            meetup: question.meetup,
            title: question.title,
            body: question.body,
            downvotes: question.downvotes,
            upvotes: question.upvotes
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
    questions[arrIndex].upvotes++;
    upvotes(questions);
    const response = {
        status: 200,
        data: [{
            meetup: question.meetup,
            title: question.title,
            body: question.body,
            downvotes: question.downvotes,
            upvotes: question.upvotes
        }]
    };
    res.send(response);
}
}

export default questionController;