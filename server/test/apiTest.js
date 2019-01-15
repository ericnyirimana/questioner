const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const meetupTest = {
  location: 'kigali',
  images: [
    'user.jpg',
    'test.jpg'
  ],
  topic: 'Meetup Title',
  description: 'Andela Test',
  happeningOn: '2019-01-31',
  tags: [
    'andela',
    'music'
  ]
};

const rsvpTest = {
  meetup: 1,
  user: 1,
  response: 'I will be part'
};

const questionTest = {
  createdBy: 1,
  meetup: 1,
  title: 'testing',
  body: 'test test tes'
};

  describe('Meetup Creation Test', () => {
    it('Meetup Post Succeed', (done) => {
      chai.request(server)
        .post('/api/v1/meetups')
        .send(meetupTest)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
  describe('Quesions Post on meetup Test', () => {
    it('Questions Post Succeed', (done) => {
      chai.request(server)
        .post('/api/v1/questions')
        .send(questionTest)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
  describe('Meetup Reservation', () => {
    it('Meetup Reservation Succeed', (done) => {
      chai.request(server)
        .post('/api/v1/meetups/1/rsvps')
        .send(rsvpTest)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
  describe('Meetup Views', () => {
    it('Meetup Fetched', (done) => {
      chai.request(server)
        .get('/api/v1/meetups')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
  describe('Upcoming Meetups', () => {
    it('Meetup Fetched', (done) => {
      chai.request(server)
        .get('/api/v1/meetups/upcoming')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
  describe('Get Specific Meetups', () => {
    it('Meetup Fetched', (done) => {
      chai.request(server)
        .get('/api/v1/meetups/1')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
  describe('RVSP Meetup', () => {
    it('Meetup Rsvp', (done) => {
      chai.request(server)
        .post('/api/v1/meetups/1/rsvps')
        .send(rsvpTest)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });