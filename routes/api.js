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
  date: req.body.date ? new Date(req.body.date).toDateString() : Date.now(),
  //  date: new Date(req.body.date).toDateString(),
  userId : data._id
  })
  
  console.log('...saving...')
  //console.log(newExerciseLog.date.toDateString())
  console.log(newExerciseLog)
  
  newExerciseLog.save(function(err,data){
  
  if(err){next(err)}
  console.log('saved success')
    data=data.toObject()
    data.date=new Date(data.date).toDateString()
    console.log(data)
  res.json(data)
  
    //next(null,data)
  }) //ExerciseSave
  }) //findOne   
}) // router.post


/////////////////////////////////////////////////
// get user exercise log

router.get('/log', function(req,res,next){
console.log('log history request: query is :')
  console.log(req.query)

  var logUserId=req.query.userId
  var logFromDate=new Date(req.query.from)
  var logToDate=new Date(req.query.to)
  
  apiUsers.findById(logUserId, function(err, data) {
  
  if (err) {
    console.log(err)
    return next(err) }
  if (!data){
    console.log('find userId not exist in log')
    return next({status:400, message: 'unknown userId'}) 
  } //if.err 
  //console.log('_id is')
    console.log(data)
  console.log('found user : '+ data.username+' ...getting exercises')
  //return next(null, data)
  
    
  var exerciseLog=Exercises.find({
    userId:data._id,
     date: {
       $lte: logToDate != 'Invalid Date' ? logToDate.getTime() : Date.now() ,
       $gte: logFromDate != 'Invalid Date' ? logFromDate.getTime() : 0
        }
  //}, 
  //    function(err,data){
  //if (err) return next(err)
    
    //console.log('execises done:')
   //console.log(data) 
  //res.json(data)
  }).sort('-date')
  .limit(parseInt(req.query.limit))
  .exec((err, result)=>{
    if(err) return next(err)
    
   console.log(result) 
    
  res.json(result)
  })
    
    
    
    
    
    
 }) //original findOne

  
})//router.get.log



module.exports = router
