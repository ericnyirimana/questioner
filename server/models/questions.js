import fs from 'fs';
import questiondata from '../../data/questions.json';
// GET QUESTION LIST
let questionsList = [];
try {
    questionsList = questiondata;
} catch (err) {
    questionsList = [];
}
// Create Question
function addQuestion(data) {
    fs.writeFile('././data/questions.json', JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
    });
}
// Downvote Question
function downvotes(data) {
    fs.writeFile('././data/questions.json', JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
    });
}
// upvote Question
function upvotes(data) {
    fs.writeFile('././data/questions.json', JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
    });
}
export {
addQuestion, questionsList as questions, downvotes, upvotes
};