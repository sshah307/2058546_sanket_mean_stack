let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");

let app = express();

let http = require("http").Server(app);

let chatModel = require("./chat.model");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let url = "mongodb://localhost:27017/tcsmean";

mongoose
  .connect(url)
  .then((res) => console.log("connected"))
  .catch((error) => console.log(error));

let io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "//index.html");
});

io.on("connection", (socket) => {
  console.log("Client connected");
  var msgName = "";
  var msgBody = "";
  socket.on("name", (msg) => {
    msgName = msg;
    console.log(msgName);
  });

  socket.on("body", (msg2) => {
    msgBody = msg2;
    console.log(msgBody);
    chatModel.insertMany({ name: msgName, message: msgBody }, (err, result) => {
      if (!err) {
        console.log("Course stored successfully.");
      } else {
        console.log(err);
      }
    });
  });
});

http.listen(9090, () => console.log("Server running on port number 9090"));
