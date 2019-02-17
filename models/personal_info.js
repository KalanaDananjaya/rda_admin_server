const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personalInfo = new Schema({
  email: {
    type: String,
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
  fname : {
    type: String,
    required: true
  },
  lname : {
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

module.exports = mongoose.model("personal_info", personalInfo);