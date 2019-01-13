const fs = require('fs');
// GET users LIST
let userList = [];
const userData = '../data/users.json';
try {
    userList = require(userData);
} catch (err) {
    userList = [];
}

// Create user account
function addUser(data) {
    fs.writeFile('./data/users.json', JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
    });
}

module.exports = {
    addUser,
    users: userList
};