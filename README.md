[![Build Status](https://travis-ci.org/ericnyirimana/questioner.svg?branch=develop)](https://travis-ci.org/ericnyirimana/questioner)    [![Maintainability](https://api.codeclimate.com/v1/badges/92a47f596a3f750e2779/maintainability)](https://codeclimate.com/github/ericnyirimana/questioner/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/ericnyirimana/questioner/badge.svg?branch=ch-resolve-coveralls-travis-ci)](https://coveralls.io/github/ericnyirimana/questioner?branch=ch-resolve-coveralls-travis-ci)

# QuestionerApp

This app will allow users to post questions on meetup and members can prioritize by up voting or down voting a questions to be answered This project will allow users to post questions for meetups and members can prioritize by upvoting or downvoting questions to be answered. Admin can add meetups and delete them, In order for a user to post a question to a specific meetup they need to register into the system so that they can log in an be presented with all system features.

# API ENDPOINTS

- POST https://eric-questioner-app.herokuapp.com/api/v1/auth/signup this endpoint allow a user to create an account
- POST https://eric-questioner-app.herokuapp.com/api/v1/auth/login this permit a user to login
- POST https://eric-questioner-app.herokuapp.com/api/v1/meetups this allow to post meetup
- GET https://eric-questioner-app.herokuapp.com/api/v1/meetups this allow to get all meetups
- GET https://eric-questioner-app.herokuapp.com/api/v1/meetups/1 this allow to fetch specific meetup
- GET https://eric-questioner-app.herokuapp.com/api/v1/meetups/upcoming this allow to get all upcoming meetups
- POST https://eric-questioner-app.herokuapp.com/api/v1/meetups/1/questions  This allow to post a question on a meetup
- POST https://eric-questioner-app.herokuapp.com/api/v1/meetups/1/rsvps this allow to reserve a space on a meetup
- PATCH https://eric-questioner-app.herokuapp.com/api/v1/questions/1/downvote this allow to downvote a question
- PATCH https://eric-questioner-app.herokuapp.com/api/v1/questions/1/upvote this allow to upvote a question
- POST https://eric-questioner-app.herokuapp.com/api/v1/questions/1/comment this allow to comment a question

# DEPOLOYMENT

- https://ericnyirimana.github.io/questioner/ ( UI GH-PAGES )
- https://eric-questioner-app.herokuapp.com/ ( HEROKU ENDPOINT HOST)
