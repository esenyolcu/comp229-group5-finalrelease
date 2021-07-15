let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the survey model
let survey = require('../models/survey');

router.get('/', (req, res, next) => {
    // find all books in the books collection
    survey.find( (err, surveys) => {
      if (err) {
        return console.error(err);
      }
      else {
        res.render('surveys/index', {
          title: 'Survey',
          survey: surveys
        });
      }
      console.log("sdfsdfsd");
      console.log(surveys.surveyOwner);
    });
  
  });

  module.exports = router;