import fs from 'fs';
import userData from '../../data/users.json';
// GET users LIST
let userList = [];
try {
    userList = userData;
} catch (err) {
    userList = [];
}

// Create user account
function addUser(data) {
    fs.writeFile('././data/users.json', JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
    });
}

export {
addUser, userList as users
};