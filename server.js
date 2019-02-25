/*reference
https://www.zeolearn.com/magazine/designing-a-rest-api-with-nodejs-and-mongodb-atlas
*/

const express = require("express");
const bodyParser = require("body-parser");
const routeController = require("./controllers/routeController.js")
const loginController = require("./controllers/loginController.js")
const passwordController = require("./controllers/passwordController.js")
const fileUpload = require('express-fileupload');
const projects = require('./routes/project.js');
const files = require('./routes/file.js');
const passport = require('passport');

// db instance connection
require("./config/db_connection");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(fileUpload());
app.use('/projects',projects);
app.use('/files',files);

const port = process.env.PORT || 3301;

app.get("/",function (req,res){
  res.send('hello world');
});

app.route("/getAllUsers").get(routeController.listPersonalInfo);  //tested and verified
app.route("/getUser").post(routeController.listUserInfo);         //tested and verified

app.route("/createUser").post(routeController.createUser);  //tested and verified

app.route("/pendingUsers").get(routeController.listPendingUsers);  //tested and verified
app.route("/approvedUsers").get(routeController.listApprovedUsers); //tested and verified
app.route("/rejectedUsers").get(routeController.listRejectedUsers);

app.route("/approveUser").post(routeController.approveUser); //tested and verified
app.route("/rejectUser").post(routeController.rejectUser);
app.route("/deleteUser").post(routeController.deleteUser);

app.route("/login").post(loginController.loginUser); //tested and verified
app.route("/verify").post(loginController.verifyUser); //tested and verified
app.route("/changePassword").post(passwordController.changePassword); //yet to be finished



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

