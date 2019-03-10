const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const loginInfo = new Schema({
  email: {
    type: String,
    required: true,
    unique : true
  },
  uid: {
    type: String,
    required : true
  },
  password : {
      type : String,
      required : true
  },
  approvalStatus  :{
    type : Array,
    items : {
        type : String,
        enum : ["approved","pending","rejected"]  //status of approval of the user
    }
  },
  user_type : {
    type : Array,
    items : {
        type : String,
        enum : ["admin","user"] 
    }
  },
  category : {
    type : Array,
    items : {
        type : String,
        enum : ["Ministry of Land","D/S","DOP","SS","DS","VD","Ministry of Highways"]  //dept of printing,divisional secretary
    }
  },
  reset_password_token: {
    type: String,
    default : null
  },
  reset_password_expires: {
    type: Date,
    default : null
  }
});

loginInfo.plugin(uniqueValidator);

module.exports = mongoose.model("login_info", loginInfo);