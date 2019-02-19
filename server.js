/*reference
https://www.zeolearn.com/magazine/designing-a-rest-api-with-nodejs-and-mongodb-atlas
*/

const express = require("express");
const bodyParser = require("body-parser");
const routeController = require("./controllers/routeController.js")

// db instance connection
require("./config/db_connection");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3301;

app.get("/",function (req,res){
  res.send('hello world');
});

app.route("/getAllUsers").get(routeController.listPersonalInfo);
app.route("/getUser").post(routeController.listUserInfo);

app.route("/createUser").post(routeController.createUser);

app.route("/pendingUsers").get(routeController.listPendingUsers);
app.route("/approvedUsers").get(routeController.listApprovedUsers);
app.route("/rejectedUsers").get(routeController.listRejectedUsers);

app.route("/approveUser").post(routeController.approveUser);
app.route("/rejectUser").post(routeController.rejectUser);
app.route("/deleteUser").post(routeController.deleteUser);




app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

