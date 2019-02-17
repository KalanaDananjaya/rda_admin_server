const mongoose = require("mongoose");

const dbURI =
  "mongodb+srv://kalana:rda_project@cluster0-eghw9.mongodb.net/test?retryWrites=true";
const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
  useNewUrlParser : true
};

mongoose.connect(dbURI, options).then(
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

