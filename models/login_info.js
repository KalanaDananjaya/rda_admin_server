const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginInfo = new Schema({
  email: {
    type: String,
    required: true
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
  }
});

module.exports = mongoose.model("login_info", loginInfo);