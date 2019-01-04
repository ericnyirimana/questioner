const fs = require('fs');
// GET QUESTION LIST
let questionsList = [];
const questiondata = "../data/questions.json";
try{
    questionsList = require(questiondata);
} catch(err) {
    questionsList = [];
}
// Create Question
function addQuestion(data) {
    fs.writeFile('./data/questions.json', JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
    });
}
module.exports = {
    addQuestion,
    questions: questionsList

};