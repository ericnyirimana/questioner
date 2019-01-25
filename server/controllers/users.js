import bcrypt from 'bcryptjs';
import moment from 'moment';
import { validateUser, validateLogin, generateToken } from '../helpers/users';
import Dbcreatation from '../../db';

class userController {
static add_user(req, res) {
    // Validate Data
const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });
    bcrypt.genSalt(10, (error, salt) => {
        if (error) {
            console.log(error);
        }
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
                console.log(err);
            }
            const user = [
                req.body.firstname,
                req.body.othername,
                req.body.lastname,
                req.body.email,
                req.body.username,
                req.body.phoneNumber,
                moment().format('YYYY-MM-DD'),
                req.body.isAdmin,
                hash
            ];
        if (user.length > 0) {
            console.log(user);
        const sql = `INSERT INTO users (firstname,othername,
            lastname,email,username,phone_number,registered,is_admin,password)
               VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;
               Dbcreatation.pool.query(sql, user)
            .then((response) => {
                const userData = response.rows;
                console.log(userData);
                const data = {
                    user: userData[0].id,
                    firstname: userData[0].firstname,
                    othername: userData[0].othername,
                    lastname: userData[0].lastname,
                    email: userData[0].email,
                    username: userData[0].username,
                    phone_number: userData[0].phone_number,
                    registered: userData[0].registered,
                    is_admin: userData[0].is_admin
                };
                const token = generateToken(data);
                console.log(data);
                return res.status(201).json({
                    status: 201,
                    data: [{ token }],
                  });
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
        });
    });
}

static login(req, res) {
const { error } = validateLogin(req.body);
            if (error) {
                return res.status(400).send({
                status: 400,
                error: error.details[0].message
                });
            }
    const getuser = `SELECT * FROM users where email = '${req.body.email}'`;
    Dbcreatation.pool.query(getuser)
    .then((result) => {
        if (result.rows.length > 0) {
         bcrypt.compare(req.body.password, result.rows[0].password, (err, isMatch) => {
             if (err) {
                 console.log(err);
             }
             if (isMatch) {
                return res.status(201).json({
                    status: 201,
                    data: 'Welcome to questioner'
                  });
             }
                 return res.status(401).json({ error: 'password incrorrect' });
         });
        } else {
            return res.status(400).send({
                status: 400,
                data: 'Email or Password is incorrect'
            });
        }
    })
    .catch((err) => {
        console.log(err.message);
        return res.status(500).json({
           status: 500,
           data: `Server error ${error}`
         });
    });
    }
}


export default userController;