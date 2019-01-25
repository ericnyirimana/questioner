import moment from 'moment';
import Dbcreatation from '../../db';
import { validatecomment } from '../helpers/questions';

class questionController {
static welcome_message(req, res) {
    res.json({
        message: 'WELCOME TO QUESTIONER'
    });
}

static downvote_question(req, res) {
const getquestion = `SELECT * FROM questions where id = ${req.params.id}`;
Dbcreatation.pool.query(getquestion)
    .then((result) => {
    if (result.rows.length > 0) {
    const votes = [
        req.params.id,
        req.body.user_id,
        'downvotes'
    ];
    if (votes.length > 0) {
        const sqlvotes = `INSERT INTO question_votes (question_id,user_id,vote_status)
        VALUES ($1,$2,$3) RETURNING *`;
        Dbcreatation.pool.query(sqlvotes, votes)
        .then((response) => {
        const update_question_vote = `UPDATE questions SET downvotes = downvotes + 1 WHERE id = ${req.params.id}`;
        Dbcreatation.pool.query(update_question_vote);
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
else {
    return res.status(400).send({
        status: 400,
        data: 'Question ID is not found'
    });
}
});
}

static upvote_question(req, res) {
    const getquestion = `SELECT * FROM questions where id = ${req.params.id}`;
    Dbcreatation.pool.query(getquestion)
        .then((result) => {
        if (result.rows.length > 0) {
        const votes = [
            req.params.id,
            req.body.user_id,
            'upvotes'
        ];
        if (votes.length > 0) {
            const sqlvotes = `INSERT INTO question_votes (question_id,user_id,vote_status)
            VALUES ($1,$2,$3) RETURNING *`;
            Dbcreatation.pool.query(sqlvotes, votes)
            .then((response) => {
            const update_question_vote = `UPDATE questions SET upvotes = upvotes + 1 WHERE id = ${req.params.id}`;
            Dbcreatation.pool.query(update_question_vote);
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
    else {
        return res.status(400).send({
            status: 400,
            data: 'Question ID is not found'
        });
    }
    });
}

static add_comment(req, res) {
    const getquestion = `SELECT * FROM questions where id = ${req.params.id}`;
    Dbcreatation.pool.query(getquestion)
        .then((result) => {
            console.log(result);
        if (result.rows.length > 0) {
            const { error } = validatecomment(req.body);
            if (error) {
                return res.status(400).send({
                status: 400,
                error: error.details[0].message
                });
            }
        const comment = [
            req.params.id,
            req.body.user_id,
            req.body.comment,
            moment().format('YYYY-MM-DD')
        ];
        if (comment.length > 0) {
            const sqlcomment = `INSERT INTO question_comments(question_id,user_id,comment,date_commented)
            VALUES ($1,$2,$3,$4) RETURNING *`;
            Dbcreatation.pool.query(sqlcomment, comment)
            .then((response) => {
             return res.status(201).json({
                 status: 201,
                 data: response.rows,
               });
         })
         .catch((err) => {
             console.log(err.message);
             return res.status(400).json({
                status: 400,
                data: 'Question ID not found'
              });
         });
    }
    }
    else {
        return res.status(400).send({
            status: 400,
            data: 'Question ID is not found'
        });
    }
    });
}
}

export default questionController;