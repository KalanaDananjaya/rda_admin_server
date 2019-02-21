const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const personalInfo = new Schema({
  email: {
    type: String,
    unique : true,
    required: true
  },
  uid: {
    type: String,
    required : true
  },
  telephone : {
      type : Number,
      required : true
  },
  name : {
    type: String,
    required: true
  },
  category : {
    type : Array,
    items : {
        type : String,
        enum : ["dop","ds"]  //dept of printing,divisional secretary
    }
  },
  approvalStatus  :{
    type : Array,
    items : {
        type : String,
        enum : ["approved","pending","rejected"]  //status of approval of the user
    }
  },
  user_type: {
    type : Array,
    items : {
        type : String,
        enum : ["admin","user"] 
    }
  }
});

personalInfo.plugin(uniqueValidator);

module.exports = mongoose.model("personal_info", personalInfo);