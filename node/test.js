/*
Complete the Express application that runs on port 3000 and connects to a Database assignment. 
The database should have a user collection which contains the following user details. 

    a) userId - "user1",
    firstName - "Akshay",
    lastName - "Kumar",
    email - "khiladi@gmail.com"

    b)  userId - "user2"
	firstName - "Rajnikanth",
	lastName - "",
	email - "boss@rajnikanth.com"

    The application should have the following api - 
    /users - returns the JSON of all users in the DB
    /users/:userId - returns the object of a single user based on the userId passed

NOTE: You are not required to use app.listen(<port>). This will be handled by the system.

*/

const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const UserModel = require('./User.js');
const http = require("http");
const appConfig = require("./config/appConfig");

// let db = mongoose.connect('mongodb://testuser:password123@ds149252.mlab.com:49252/assignment', { useMongoClient: true });

app.get('/users', function (req, res, err){
    UserModel.find().select('-__v').lean().exec((err, result) => {
        if(err){
            console.log(err);
            let apiResponse = response.generate(true, 500, 'Some error message', null)
            res.send(apiResponse);
        }else if(result === undefined || result === '' || result === null){
            let apiResponse = response.generate(true, 500, "Some error message", null)
            res.send(apiResponse);
        }else{
            let apiResponse = response.generate(false, 200, null, result)
            res.send(apiResponse);
        }
    });
});
app.get('/users/:userId', function(req, res, err){
    UserModel.findOne({'userId': req.params.userId}, (err, result) => {
        if (err) {
          console.log(err);
          let apiResponse = response.generate(
            true,
            500,
            "Some error message",
            null
          );
          res.send(apiResponse);
        } else if (result === undefined || result === "" || result === null) {
          let apiResponse = response.generate(
            true,
            500,
            "Some error message",
            null
          );
          res.send(apiResponse);
        } else {
          let apiResponse = response.generate(false, 200, null, result);
          res.send(apiResponse);
        }
    });
});


app.get('/split/name', (req, res) => {
    let fullName = req.query.fullName;
    let fullArray = fullName.split(" ");
    let objectArray = {
        "firstName":fullArray[0],
        "lastName":fullArray[1]
    };
    res.send(objectArray);
    
});// end split name

app.get('/calculate/age', (req, res) => {

    let dob = req.query.dob;
    // let dobArray = dob.split("-");
    // let dYear = Number(dobArray[0]);
	// let dMonth = Number(dobArray[1]);
    
    // let today = new Date();
    // let m = today.getMonth()+1;
    // let y = today.getYear();
    // let age = dYear-y;

    // if(dMonth>m){
    //     agee=age-1;
    // }

    // let ageObj={"age":age, "agee":agee};


    //new
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if(m<0 || (m===0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    let ageObj = {"age":age};
    res.send(ageObj);
});// end calculate age










const server = http.createServer(app);
// start listening to http server
console.log(appConfig);
server.listen(appConfig.port);
server.on("listening", onListening);

// end server listening code

// socket io connection handler
// const socketLib = require("./libs/socketLib");
// const socketServer = socketLib.setServer(server);
// end socketio connection handler

/**
 * Event listener for HTTP server "error" event.
 */


/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  "Listening on " + bind;
//   logger.info(
//     "server listening on port" + addr.port,
//     "serverOnListeningHandler",
//     10
//   );
console.log("Server listing")
  let db = mongoose.connect(appConfig.db.uri, { useMongoClient: true });
}

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

mongoose.set("useCreateIndex", true);

mongoose.connection.on("error", function(err) {
  console.log("Error in DB connecting");
  console.log(err);
});

mongoose.connection.on("open", function(err) {
  if (err) {
    console.log("DB error");
    console.log(err);
  } else {
    console.log("Database Connected successfully");
  }
});


module.exports = app;