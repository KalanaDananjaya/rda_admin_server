/*reference
https://www.zeolearn.com/magazine/designing-a-rest-api-with-nodejs-and-mongodb-atlas
*/

/*NEED TO REMOVE  dotenv as dev dependency and passport * as dependencies */
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require ('dotenv').config();

// db instance connection
require("./config/db_connection");

const routeController = require("./controllers/routeController.js")
const loginController = require("./controllers/loginController.js")
const passwordController = require("./controllers/passwordController.js")
const passwordResetConroller = require("./controllers/passwordResetController.js")


const projects = require('./routes/project.js');



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/projects',projects);

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
app.route("/changePassword").post(passwordController.changePassword); //tested and verified

app.route("/auth/forgot_password").get(passwordResetConroller.render_forgot_password_template).post(passwordResetConroller.forgot_password); //tested and verified
app.route("/auth/reset_password").get(passwordResetConroller.render_reset_password_template).post(passwordResetConroller.reset_password);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

