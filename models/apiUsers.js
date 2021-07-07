var mongoose = require('mongoose')
var shortid=require('shortid')
var Schema = mongoose.Schema
var userSchema = new Schema ({
username: {
  type:String, 
  required:true, 
  unique:true
},
  _id:{
type: String,
default: shortid.generate,                    
index: true,
    
  
  }

})
var apiUsers = mongoose.model('apiUsers',userSchema)
module.exports = apiUsers