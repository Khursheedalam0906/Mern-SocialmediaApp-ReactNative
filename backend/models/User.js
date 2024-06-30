const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  posts: {
    type: Array,
    default: [],
  },
  followers: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
  description: {
    type: String,
    default: "",
  },
  allmessages: {
    type: String,
    default: [],
  },
});

mongoose.model("User", userSchema);
