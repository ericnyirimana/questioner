import moment from 'moment';
import {
validateMeetup, validateRsvp, validateQuestion
} from '../helpers/meetups';
import Dbcreatation from '../../db';

class meetupController {
// get meetups
static get_meetups(req, res) {
    const getmeetup = 'SELECT * FROM meetups';
           Dbcreatation.pool.query(getmeetup)
           .then((response) => {
            console.log(response);
            return res.status(200).json({
                status: 200,
                data: response.rows,
              });
        })
        .catch((err) => {
            console.log(err.message);
        });
}

static get_upcoming_meetups(req, res) {
    const getmeetup = 'SELECT * FROM MEETUPS WHERE happeningon > $1 order by happeningon ASC';
    Dbcreatation.pool.query(getmeetup, [moment().format('YYYY-MM-DD')])
    .then((response) => {
     console.log(response);
     return res.status(200).json({
         status: 200,
         data: response.rows,
       });
 })
 .catch((err) => {
     console.log(err.message);
 });
}

static get_specific_meetups(req, res) {
    const getmeetup = 'SELECT * FROM MEETUPS WHERE id =$1';
    Dbcreatation.pool.query(getmeetup, [req.params.id])
    .then((response) => {
     console.log(response);
     return res.status(200).json({
         status: 200,
         data: response.rows,
       });
 })
 .catch((err) => {
     console.log(err.message);
 });
}

static post_meetups(req, res) {
    const {
        error
    } = validateMeetup(req.body);
if (error) {
return res.status(400).send({
status: 400,
error: error.details[0].message
    });
}
const meetup = [
    moment().format('YYYY-MM-DD'),
    req.body.location,
    req.body.topic,
    req.body.description,
    req.body.happeningOn,
    req.body.tag,
    req.body.image,
];

if (meetup.length > 0) {
    const sqlmeetup = `INSERT INTO meetups (createdon,location,topic,description,happeningon,tag,image)
           VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
           Dbcreatation.pool.query(sqlmeetup, meetup)
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

static post_rsvp(req, res) {
    // Validate Data
    const {
        error
    } = validateRsvp(req.body);
    if (error) {
        return res.status(400).send({
        status: 400,
        error: error.details[0].message
    });
}
const getmeetup = 'SELECT * FROM meetups WHERE id = $1';
let topic = '';
const meetup = Dbcreatation.pool.query(getmeetup, [req.params.id])
.then((response) => {
    topic = response.rows[0].topic;
});
console.log(meetup.rows);
    const rsvp = [
        req.params.id,
        req.body.user,
        req.body.response,
    ];
    if (rsvp.length > 0) {
        const sqlrsvp = `INSERT INTO rsvp (meetup_id,user_id,response)
           VALUES ($1,$2,$3) RETURNING *`;
           Dbcreatation.pool.query(sqlrsvp, rsvp)
        .then((response) => { return res.status(201).json({
                status: 201,
                topic,
                data: response.rows
              });
        })
        .catch((err) => {
            console.log(err.message);
        });
    }
}

static post_question(req, res) {
    const {
        error
    } = validateQuestion(req.body);
    if (error) {
        return res.status(400).send({
        status: 400,
        error: error.details[0].message
    });
}
const getmeetup = `SELECT * FROM meetups where id = ${req.params.id}`;
Dbcreatation.pool.query(getmeetup)
    .then((result) => {
    if (result.rows.length > 0) {
    const question = [
        moment().format('YYYY-MM-DD'),
        req.body.createdBy,
        req.params.id,
        req.body.title,
        req.body.body,
        0,
        0
    ];
    if (question.length > 0) {
        const sqlquestion = `INSERT INTO questions (createdon,createdby,meetup_id,title,body,downvotes,upvotes)
        VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
        Dbcreatation.pool.query(sqlquestion, question)
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
else {
    return res.status(400).send({
        status: 400,
        data: 'Question ID is not found'
    });
}
});
}
}

export default meetupController;