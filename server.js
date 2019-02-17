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

app.route("/getUsers").get(routeController.listPersonalInfo);
app.route("/getUsers/:uid").get(routeController.listUserInfo);

app.route("/createUser").post(routeController.createUser);

app.route("/pendingUsers").get(routeController.listPendingUsers);
app.route("/approvedUsers").get(routeController.listApprovedUsers);
app.route("rejectedUsers").get(routeController.listRejectedUsers);

app.route("/approveUser/:uid").get(routeController.approveUser);
app.route("/rejectUser/:uid").get(routeController.rejectUser);
app.route("/deleteUser/:uid").get(routeController.deleteUser);




app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

