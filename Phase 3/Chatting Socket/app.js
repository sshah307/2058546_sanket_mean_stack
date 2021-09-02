let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "//index.html");
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("obj", (msg) => {
    console.log(msg);
    if (msg == "hi" || msg == "Hi") {
      socket.emit(
        "obj1",
        `
        Hi, How can I help you? Which of the following is your concern Refund or Return?`
      );
    } else if (msg == "Refund" || msg == "refund") {
      socket.emit(
        "obj1",
        `
        Information related to refund is at www.refund2you.com`
      );
    } else if (msg == "Return" || msg == "return") {
      socket.emit(
        "obj1",
        `
        Information related to return is at www.return2you.com`
      );
    } else {
      socket.emit("obj1", "Start again");
    }
  });
});

http.listen(4200, () => console.log("Server running on port number 4200"));
