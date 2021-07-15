let mongoose = require('mongoose');

// create a model class
let Survey = mongoose.Schema({
   surveyOwner:String,
    surveyName:String, 
    createdDate:String,
   modifiedDate:String,
    url: String,
    questions:[	
        {
           questionNumber:Number,
           questionDetail:String,
           questionFormat: String
             
        } 
     ]
 
},
{
  collection: "Survey"
});

module.exports = mongoose.model('Survey', Survey);
