const apiUsers = require('../models/apiUsers')
const Exercises = require('../models/exercises')

const router = require('express').Router()
console.log('..routing...')


router.post('/new-user',(req,res,done)=>{
// rec'd new user submit
  
console.log('adding new user...')
  console.log(req.body);
  
  var newUser = new apiUsers(req.body)
  
  newUser.save(function(err,data){
  if(err){
    console.log(err)
    //res.send({"error": err})
    if(err.code ==11000){
      return done({status:400, message: 'username already taken'})
    }
    
    done(err)
    }
  
  console.log('new user saved')
    console.log(data)
    res.json({data})
    //res.json({"username/userId" : data.username})
  done(null,data)
  })
  
  // check if username already exists..
//var result = findUserByName(req.body)
  //console.log(result)
//console.log(   findUserByName(req.body) )
  ///////////////
  //next()
  
})
///////////////////////////////////
//get all users

router.get('/users', (req,res,next) => {
  console.log('retrieving users')
  apiUsers.find({}, (err, data) => {
    res.json(data)
  })
})

///////////////////////////////////////////
router.post('/add',function (req,res,next){
console.log('logging exercise')
//  console.log(req.body)
//console.log(typeof(req.body.date))
  //const testDate = new Date(req.body.date)
  //console.log(testDate)
    
// find _id of username
  console.log(req.body.userId)
  apiUsers.findOne({_id:req.body.userId}, function(err, data) {
  
  if (err) {
    console.log('find userId error')
    return next(err) 
  } //if.err 
  console.log('_id is')
  console.log(data)
  //return next(null, data)
  
// }) //original findOne
  var newExerciseLog = new Exercises({
  username : data.username,
  description: req.body.description,
  duration: req.body.duration,
  date: req.body.date ? new Date(req.body.date): Date.now(),
  userId : data._id
  })
  
  console.log('...saving...')
  console.log(newExerciseLog)
  
  newExerciseLog.save(function(err,data){
  
  if(err){next(err)}
  console.log('saved success')
    //data.date=data.date.toDateString()
    console.log(data)
  res.json(data)
  
    //next(null,data)
  }) //ExerciseSave
  }) //findOne   
}) // router.post


/////////////////////////////////////////



module.exports = router
