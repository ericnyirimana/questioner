import validateUser from '../helpers/users';
import Dbcreatation from '../../db';

class userController {
static add_user(req, res) {
const users = [];
    // Validate Data
const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });
    const user = [
        req.body.firstname,
        req.body.othername,
        req.body.lastname,
        req.body.email,
        req.body.username,
        req.body.phoneNumber,
        req.body.isAdmin,
        req.body.password
    ];
if (users !== '') {
const sql = `INSERT INTO users (firstname,othername,
    lastname,email,username,phone_number,is_admin,password)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
       Dbcreatation.pool.query(sql, user)
    .then((response) => {
        console.log(response);
        return res.status(201).json({
            status: 201,
            data: response.rows,
          });
    })
    .catch((err) => {
        console.log(err.message);
    });
}
}
}

export default userController;