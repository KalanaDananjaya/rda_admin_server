const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const superAdmin = new Schema({
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
  }
});

module.exports = mongoose.model("super_admin", superAdmin);