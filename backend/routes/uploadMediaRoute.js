const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

require("dotenv").config();

router.post("/uploadprofile", (req, res) => {
  const { email, profilePic } = req.body;
  // console.log("Email", email);
  // console.log("profilePic", profilePic);
  if (!email || !profilePic) {
    return res.status(422).json({ error: "Please fill all the fields" });
  } else {
    User.findOne({ email: email }).then(async (savedUser) => {
      if (savedUser) {
        savedUser.profilePic = profilePic;
        await savedUser
          .save()
          .then((user) => {
            return res
              .status(200)
              .json({ message: "Profile picture uploaded Successfully" });
          })
          .catch((error) => {
            return res.status(422).json({ error: "Server error" });
          });
      } else {
        return res.status(422).json({ error: "Invalid Credentials" });
      }
    });
  }
});

router.post("/addpost", (req, res) => {
  const { email, posts, postdescription } = req.body;
  if (!email || !posts) {
    return res.status(422).json({ error: "Please add all the fields" });
  } else {
    User.findOne({ email: email })
      .then(async (savedUser) => {
        if (savedUser) {
          savedUser.posts.push({
            posts,
            postdescription,
            likes: [],
            comments: [],
          });
          savedUser
            .save()
            .then((user) => {
              return res
                .status(200)
                .json({ message: "Post added Successfully" });
            })
            .catch((error) => {
              return res.status(422).json({ error: "Server error" });
            });
        } else {
          return res.status(422).json({ error: "Invalid Credentials" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

module.exports = router;
