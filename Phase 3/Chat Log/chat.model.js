let mongoose = require("mongoose");

mongoose.pluralize(null);
let chatSchema = mongoose.Schema({
  name: String,
  message: String,
});

let chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;
