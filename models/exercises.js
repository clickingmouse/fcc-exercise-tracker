//exercise schema
const mongoose = require('mongoose')
var Schema = mongoose.Schema
var exerciseSchema = new Schema({

username : {type:String,required:true},
description: {type:String,required:true},
  duration: {type:Number,required:true},
    date: {type: Date,
           default: Date.now
          },
  userId:{
type: String,
  ref:'Users',
  index:true
  }
})

var Exercises=mongoose.model('Exercises', exerciseSchema)

module.exports = Exercises