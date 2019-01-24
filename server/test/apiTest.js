import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

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
  user: 1,
  response: 'Yes'
};

const questionTest = {
  createdBy: 1,
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
          expect(res.body.data[0].location).to.be.equal(meetupTest.location);
          expect(res.body.data[0].happeningOn).to.be.equal(meetupTest.happeningOn);
          expect(res.body.data[0].tags[0]).to.be.equal(meetupTest.tags[0]);
          expect(res.body.data[0].tags[1]).to.be.equal(meetupTest.tags[1]);
          done();
        });
    });
  });
  describe('Quesions Post on meetup Test', () => {
    it('Questions Post Succeed', (done) => {
      chai.request(server)
        .post('/api/v1/meetups/1/questions')
        .send(questionTest)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.data[0].user).to.be.equal(questionTest.createdBy);
          expect(res.body.data[0].meetup).to.be.equal('1');
          expect(res.body.data[0].title).to.be.equal(questionTest.title);
          expect(res.body.data[0].body).to.be.equal(questionTest.body);
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
          expect(res.body.data[0].status).to.be.equal(rsvpTest.response);
          expect(res.body.data[0].meetup).to.be.equal('1');
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
  describe('Downvotes a question', () => {
    it('Downvotes', (done) => {
      chai.request(server)
        .patch('/api/v1/questions/2/downvote')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
  describe('Upvote a question', () => {
    it('Upvotes', (done) => {
      chai.request(server)
        .patch('/api/v1/questions/2/upvote')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });