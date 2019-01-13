const fs = require('fs');
// GET QUESTION LIST
let questionsList = [];
const questiondata = '../data/questions.json';
try {
    questionsList = require(questiondata);
} catch (err) {
    questionsList = [];
}
// Create Question
function addQuestion(data) {
    fs.writeFile('./data/questions.json', JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
    });
}
// Downvote Question
function downvotes(data) {
    fs.writeFile('./data/questions.json', JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
    });
}
// upvote Question
function upvotes(data) {
    fs.writeFile('./data/questions.json', JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
    });
}
module.exports = {
    addQuestion,
    downvotes,
    upvotes,
    questions: questionsList

};