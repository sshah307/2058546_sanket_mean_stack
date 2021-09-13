let express = require("express");
let MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";

let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/add.html", (req, res) => {
  res.sendFile(__dirname + "/add.html");
});

app.get("/update.html", (req, res) => {
  res.sendFile(__dirname + "/update.html");
});

app.get("/delete.html", (req, res) => {
  res.sendFile(__dirname + "/delete.html");
});

app.get("/fetch.html", (req, res) => {
  res.sendFile(__dirname + "/fetch.html");
});

app.get("favicon.ico", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.emit("status", "Connection to DB server successful");

  socket.on("addCourse", (course) => {
    MongoClient.connect(url, (err, client) => {
      if (!err) {
        let db = client.db("courses_db");

        db.collection("courses").countDocuments(
          { _id: course._id },
          (err, count) => {
            if (count > 0) {
              socket.emit("status", "This ID is already taken!");
            } else {
              db.collection("courses").insertOne(course);
              socket.emit("status", "Course added");
            }
          }
        );
      } else console.log(err);
    });
  });

  socket.on("updateCourse", (course) => {
    MongoClient.connect(url, (err, client) => {
      if (!err) {
        let db = client.db("courses_db");

        db.collection("courses").countDocuments(
          { _id: course._id },
          (err, count) => {
            if (count == 0) {
              socket.emit("status", "Course not found");
              return;
            } else {
              db.collection("courses").updateOne(
                { _id: course._id },
                { $set: { amount: course.amount } },
                (err, result) => {
                  if (!err)
                    socket.emit("status", "Course amount updated successfully");
                  else console.log(err);
                }
              );
            }
          }
        );
      } else console.log(err);
    });
  });

  socket.on("deleteCourse", (course) => {
    MongoClient.connect(url, (err, client) => {
      if (!err) {
        let db = client.db("courses_db");

        db.collection("courses").countDocuments(
          { _id: course._id },
          (err, count) => {
            if (count == 0) {
              socket.emit("status", "Course not found");
              return;
            } else {
              db.collection("courses").deleteOne(
                { _id: course._id },
                (err, result) => {
                  if (!err)
                    socket.emit("status", "Course deleted successfully");
                  else console.log(err);
                }
              );
            }
          }
        );
      } else console.log(err);
    });
  });

  socket.on("fetchCourses", (course) => {
    MongoClient.connect(url, (err, client) => {
      if (!err) {
        let db = client.db("courses_db");

        console.log(db.collection("courses").find());
        console.log(
          db
            .collection("courses")
            .find()
            .toArray((err, docs) => {
              socket.emit("courseList", docs);
            })
        );
      } else console.log(err);
    });
  });
});

http.listen(9090, () => console.log("Server running on port number 9090"));
