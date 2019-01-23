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
    id int PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    othername VARCHAR(30),
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    username VARCHAR(30) NOT NULL UNIQUE,
    phone_number CHAR(15) NOT NULL,
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
        this.pool.end();
    });

    const meetup = `
    CREATE TABLE IF NOT EXISTS meetups (
    id int PRIMARY KEY,
    createdOn TIMESTAMP,
    location VARCHAR(30) NOT NULL,
    topic VARCHAR(120) NOT NULL,
    
    description VARCHAR(120) NOT NULL,
    happeningOn DATE
        )`;
        this.pool.query(meetup)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err.message);
            this.pool.end();
        });
    const question = `
    CREATE TABLE IF NOT EXISTS questions (
    id int PRIMARY KEY,
    createdOn TIMESTAMP,
    createdBy int NOT NULL,
    meetup_id int NOT NULL,
    title VARCHAR(120) NOT NULL,
    body VARCHAR(120) NOT NULL
        )`;
        this.pool.query(question)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err.message);
            this.pool.end();
        });
    const meetup_images = `
    CREATE TABLE IF NOT EXISTS
        meetup_images(
          id int NOT NULL PRIMARY KEY,
          meetup_id int NOT NULL,
          image VARCHAR(128) NOT NULL
        )`;
        this.pool.query(meetup_images)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err.message);
            this.pool.end();
        });
    const meetup_tags = `
        CREATE TABLE IF NOT EXISTS
        meetup_tags(
          id int NOT NULL PRIMARY KEY,
          meetup_id int NOT NULL,
          tag_id int NOT NULL
        )`;
        this.pool.query(meetup_tags)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err.message);
            this.pool.end();
        });
        const tags = `
        CREATE TABLE IF NOT EXISTS
        tags(
          id int NOT NULL PRIMARY KEY,
          tag VARCHAR(30) NOT NULL
        )`;
        this.pool.query(tags)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err.message);
            this.pool.end();
        });
        const votes = `
        CREATE TABLE IF NOT EXISTS
        question_votes(
          id int NOT NULL PRIMARY KEY,
          question_id int NOT NULL,
          user_id int NOT NULL,
          vote_status VARCHAR(30) NOT NULL
        )`;
        this.pool.query(votes)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err.message);
            this.pool.end();
        });
        const rsvp = `
        CREATE TABLE IF NOT EXISTS
        rsvp(
          id int NOT NULL PRIMARY KEY,
          meetup_id int NOT NULL,
          user_id int NOT NULL,
          response VARCHAR(128) NOT NULL
        )`;
        this.pool.query(rsvp)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err.message);
            this.pool.end();
        });
}
}
  export default new Dbcreatation();
