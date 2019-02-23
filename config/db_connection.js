const mongoose = require("mongoose");
const dotenv = require ('dotenv').config();
const {dbConnString} = require ("../env_config.js");

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
  useNewUrlParser : true
};

mongoose.connect(dbConnString, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

// require any models

require("../models/login_info");
require("../models/personal_info");
require("../models/super_admin");

