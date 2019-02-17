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
})
app.route("/getUsers").get(routeController.listPersonalInfo);
app.route("/getPendingUsers").get(routeController.listPendingUsers);
app.route("/createUser").post(routeController.createUser);




app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

