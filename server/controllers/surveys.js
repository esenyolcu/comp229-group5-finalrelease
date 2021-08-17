let express = require('express');

let mongoose = require('mongoose');

let survey = require('../models/survey');

let takeasurvey = require('../models/takeasurvey');



module.exports.displaySurveyList= (req, res, next) => {
    // find all books in the books collection
    
    if (req.user == null ){
    survey.find( (err, surveys) => {
      if (err) {
        return console.error(err);
      }
      else {
        res.render('surveys/index', {
          title: 'Existing Surveys',
          survey: surveys
          , displayName: req.user ? req.user.displayName: ''
        }
        );
      }
      console.log("show all");
    }
    )
    }
    else{
    survey.find({displayName: req.user.displayName}, (err, surveys)=>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else {
        res.render('surveys/index', {
          title: 'Existing Surveys',
          survey: surveys
          , displayName: req.user ? req.user.displayName: ''
        }
        );
      }
     });
    } 
     
  
  };


  
module.exports.displayCreateSurveyPage= (req, res, next) => {

  
   // res.render('surveys/details',{title:'Create A Survey',survey:'', displayName: req.user ? req.user.displayName: ''});
   res.render('surveys/surveytype',{title:'Create A Survey',survey:'', displayName: req.user ? req.user.displayName: ''});
 
 
 }


 module.exports.createSurvey= (req, res, next) => {

   
  req.body.username=req.user.username;
  req.body.displayName=req.user.displayName;

  req.body.surveyOwner = req.user.displayName;
    let formRequest = JSON.parse(JSON.stringify(req.body));
    
  

   
  req.body.surveyName="Unknown"; 
     let a_survey = survey( formRequest); //Create a new survey
  survey.create(a_survey,(err)=>
  {
  if(err)
  {
    console.log(err);
    res.end(err);
  }
  else
  {
    res.redirect('/surveys');
  }
  
  }); 
  
  }


  module.exports.finalCreate= (req, res, next) => {

   
    req.body.username=req.user.username;
    req.body.displayName=req.user.displayName;
  
    req.body.surveyOwner = req.user.displayName;

    let formRequest = JSON.parse(JSON.stringify(req.body));

    res.render('surveys/details',{title:'Create Survey',survey:formRequest, displayName: req.user ? req.user.displayName: ''});
    ;
      //let formRequest = JSON.parse(JSON.stringify(req.body));
     
     
    
    }


  module.exports.createSurveyToEdit= (req, res, next) => {

 
    let id=req.params.id;
    survey.findById(id,(err,surveys)=>{
     if(err)
     {
         console.log(err);
         res.end(err);
     }
     else
     {
         res.render('surveys/editsurvey',{
             title:'View and Edit Survey',survey:surveys, displayName: req.user ? req.user.displayName: ''
         });
     }
    });
   
 
 }


 
 module.exports.retrieveRecentlyCreatedSurvey= (req, res, next) => {

 
  let id=req.params.id;

  console.log(survey.find({}).sort({_id:-1}).limit(1));
  survey.findById(id,(err,surveys)=>{
   if(err)
   {
       console.log(err);
       res.end(err);
   }
   else
   {
       res.render('surveys/editsurvey',{
           title:'View and Edit Survey',survey:surveys, displayName: req.user ? req.user.displayName: ''
       });
   }
  });
 

}
 

 module.exports.updateSurvey= (req, res, next) => {
 
    let id=req.params.id; 
   
    req.body._id=id;
   
    //update Survey
     let updatedSurvey = survey( JSON.parse(JSON.stringify(req.body)));
      survey.updateOne({_id:id},updatedSurvey,(err)=>
      {
          if(err)
   {
      console.log(err);
      res.end(err);
   }
   else
   {
      res.redirect('/surveys');
   }
      }
      
      );
   
   }


   module.exports.deleteSurvey=(req, res, next) => {

 
     let id=req.params.id;
     survey.remove({_id:id},(err)=>
     {
         if(err)
         {
             console.log(err);
     res.end(err);  
         }
         else{
             
     res.redirect('/surveys');
         }
     }
  
  
     );
  }



  
module.exports.displaySurveyListForTakeASurvey= (req, res, next) => {
 
  
   
  survey.find( (err, surveys) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('surveys/takeasurvey', {
        title: 'Take A Survey',
        survey: surveys
        , displayName: req.user ? req.user.displayName: ''
      }
      );
    }
    console.log("show all");
  }
  )
   
 
   

};



module.exports.takeASurvey= (req, res, next) => {

 
  let id=req.params.id;
  survey.findById(id,(err,surveys)=>{
   if(err)
   {
       console.log(err);
       res.end(err);
   }
   else
   {
       res.render('surveys/anonymousSubmit',{
           title:'Take Survey',survey:surveys, displayName: req.user ? req.user.displayName: ''
       });
   }
  });
 

}




module.exports.takeAsurveyAndPost= (req, res, next) => {

   
 
 
    let formRequest = JSON.parse(JSON.stringify(req.body));
    
    //let formUser = JSON.parse(JSON.stringify(req.user));
    
    
   // formUser +=formRequest;
    
    
    
   /* for (var key in formRequest) {
      if (formRequest.hasOwnProperty(key)) {
        item = req.user[key];
   
        //req.body[key]=item;
        console.log(key+ " " +item);
      }
    }

  */


    
     let a_survey = takeasurvey( formRequest); //Create a new survey
     takeasurvey.create(a_survey,(err)=>
  {
  if(err)
  {
    console.log(err);
    res.end(err);
  }
  else
  {
    res.redirect('/surveys/thanks');
  }
  
  }); 
  
  }





