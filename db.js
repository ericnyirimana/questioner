import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

class Dbcreatation {
constructor() {
 this.pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDB,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

this.pool.on('connect', () => {
  console.log('connected to the db');
});
this.createTables();
}
/**
 * Create Tables
 */

createTables()
{
    const users = `
    CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    othername VARCHAR(30),
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    username VARCHAR(30) NOT NULL UNIQUE,
    phone_number CHAR(15) NOT NULL UNIQUE,
    registered TIMESTAMP,
    is_admin BOOLEAN,
    password VARCHAR(120) NOT NULL
        );
        `;
    this.pool.query(users)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err.message);
    });

    const meetup = `
    CREATE TABLE IF NOT EXISTS meetups (
    id serial PRIMARY KEY,
    createdOn TIMESTAMP,
    location VARCHAR(30) NOT NULL,
    topic VARCHAR(120) NOT NULL,   
    description VARCHAR(120) NOT NULL,
    image text[] NOT NULL,
    tag text[] NOT NULL,
    happeningOn DATE
        )`;
        this.pool.query(meetup)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err.message);
        });
    const question = `
    CREATE TABLE IF NOT EXISTS questions (
    id serial PRIMARY KEY,
    createdOn TIMESTAMP,
    createdBy INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    meetup_id INT NOT NULL REFERENCES meetups(id) ON DELETE CASCADE ON UPDATE CASCADE,
    title VARCHAR(120) NOT NULL,
    body VARCHAR(120) NOT NULL,
    downvotes int NOT NULL,
    upvotes int NOT NULL
        )`;
        this.pool.query(question)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err.message);
        });
        const votes = `
        CREATE TABLE IF NOT EXISTS
        question_votes(
          id serial NOT NULL PRIMARY KEY,
          question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE ON UPDATE CASCADE,
          user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
          vote_status VARCHAR(30) NOT NULL
        )`;
        this.pool.query(votes)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err.message);
        });
        const rsvp = `
        CREATE TABLE IF NOT EXISTS
        rsvp(
          id serial NOT NULL PRIMARY KEY,
          meetup_id INT NOT NULL REFERENCES meetups(id) ON DELETE CASCADE ON UPDATE CASCADE,
          user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
          response VARCHAR(128) NOT NULL
        )`;
        this.pool.query(rsvp)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err.message);
        });
        const comment = `
        CREATE TABLE IF NOT EXISTS
        question_comments(
          id serial NOT NULL PRIMARY KEY,
          question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE ON UPDATE CASCADE,
          user_id int NOT NULL,
          comment VARCHAR(128) NOT NULL,
          date_commented DATE NOT NULL
        )`;
        this.pool.query(comment)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err.message);
        });
}
}
  export default new Dbcreatation();
