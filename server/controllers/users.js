import {
addUser, users
} from '../models/users';
import validateUser from '../helpers/users';

class userController {
static add_user(req, res) {
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
}
}

export default userController;