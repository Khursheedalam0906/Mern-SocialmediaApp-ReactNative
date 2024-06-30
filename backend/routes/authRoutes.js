const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

require("dotenv").config();

// Nodemailer Code for verification
async function mailer(recieveremail, code) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NodeMailer_Email,
      pass: process.env.NodeMailer_Password,
    },
  });
  const info = await transporter.sendMail({
    from: "Khursheed Alam",
    to: `${recieveremail}`,
    subject: "Email Verification",
    text: `Your 6 Digit verification code is ${code}`,
    html: `<b>Your 6 Digit verification code is ${code}</b>`,
  });

  console.log("Message sent: %s", info.messageId);
}

//Email Verification
router.post("/verify", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(401).json({ error: "Please add the fields" });
  } else {
    User.findOne({ email: email }).then(async (savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "User already exist" });
      } else {
        try {
          let verificationCode = Math.floor(100000 + Math.random() * 900000);
          await mailer(email, verificationCode);
          return res.status(200).json({
            message: "Verification code sent to your email",
            verificationCode,
            email,
          });
        } catch (error) {
          return res.status(422).json({ error: "Error sending email" });
        }
      }
    });
  }
});

//Change Username
router.post("/changeusername", (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(422).json({ error: "Please add the fields" });
  } else {
    User.find({ username }).then(async (savedUser) => {
      if (savedUser.length > 0) {
        return res.status(422).json({
          error: "Username already exist, Please choose other username",
        });
      } else {
        return res
          .status(200)
          .json({ message: "Username Available", username, email });
      }
    });
  }
});

//SignUp
router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(422).json({ error: "Please add all the fields" });
  } else {
    const user = new User({
      username,
      email,
      password: await bcrypt.hash(password, 8),
    });
    try {
      await user.save();
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      return res
        .status(201)
        .json({ message: "User Register Successfully", token });
    } catch (error) {
      return res.status(422).json({ error: "User not Registered" });
    }
  }
});

// Verify forgot Password
router.post("/verifyforgotpassword", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(422).json({ error: "Please add the fields" });
  } else {
    User.findOne({ email: email }).then(async (savedUser) => {
      if (savedUser) {
        try {
          let verificationCode = Math.floor(100000 + Math.random() * 900000);
          await mailer(email, verificationCode);
          return res.status(200).json({
            message: "Verification code sent to your Email",
            verificationCode,
            email,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        return res.status(422).json({ error: "Invalid Credentials" });
      }
    });
  }
});

//Reset Password
router.post("/resetpassword", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  } else {
    User.findOne({ email: email }).then(async (savedUser) => {
      if (savedUser) {
        savedUser.password = await bcrypt.hash(password, 8);
        await savedUser
          .save()
          .then((user) => {
            return res
              .status(200)
              .json({ message: "Password Changed successfully" });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        return res.status(422).json({ error: "Invalid Credential" });
      }
    });
  }
});

// Signin
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  } else {
    User.findOne({ email: email }).then(async (savedUser) => {
      if (savedUser) {
        await bcrypt
          .compare(password, savedUser.password)
          .then(async (doMatch) => {
            if (doMatch) {
              const token = jwt.sign(
                { _id: savedUser._id },
                process.env.JWT_SECRET
              );
              const { _id, username, email } = savedUser;
              return res.json({
                message: "Signed in Successfully",
                token,
                user: { _id, username, email },
              });
            } else {
              return res.status(422).json({ error: "Invalid Credentials" });
            }
          })
          .catch((error) => {
            return res.status(422).json({ error: "Invalid Credentials" });
          });
      } else {
        return res.status(422).json({ error: "Invalid Credentals" });
      }
    });
  }
});

//user data
router.post("/userdata", (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .json({ error: "You must be logged in, token not given" });
  } else {
    const token = authorization.replace("Bearer ", "");
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
      if (error) {
        return res
          .status(401)
          .json({ error: "You must logged in, token Invalid" });
      }
      const { _id } = payload;
      User.findById(_id).then((userdata) => {
        return res.status(200).json({ message: "User Found", user: userdata });
      });
    });
  }
});

//Change Password
router.post("/changepassword", async (req, res) => {
  const { oldpassword, newpassword, email } = req.body;
  if (!oldpassword || !newpassword || !email) {
    return res.status(422).json({ error: "Please add all the fields" });
  } else {
    User.findOne({ email: email }).then(async (savedUser) => {
      if (savedUser) {
        await bcrypt
          .compare(oldpassword, savedUser.password)
          .then(async (doMatch) => {
            if (doMatch) {
              savedUser.password = await bcrypt.hash(newpassword, 8);
              savedUser
                .save()
                .then((user) => {
                  return res.json({ message: "Password Changed Successfully" });
                })
                .catch((error) => {
                  return res.status(422).json({ error: "Server Error" });
                });
            } else {
              return res.status(422).json({ error: "Invalid Credentials" });
            }
          });
      } else {
        return res.status(422).json({ error: "Invalid Credentials" });
      }
    });
  }
});

// update user data
router.post("/setusername", (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(422).json({ error: "Please add all the fields" });
  } else {
    User.find({ username }).then(async (savedUser) => {
      if (savedUser.length > 0) {
        return res.status(422).json({ error: "Username already exist" });
      } else {
        User.findOne({ email: email }).then(async (savedUser) => {
          if (savedUser) {
            savedUser.username = username;
            savedUser
              .save()
              .then((user) => {
                return res
                  .status(200)
                  .json({ message: "Username updated successfully" });
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
  }
});

router.post("/setdescription", (req, res) => {
  const { description, email } = req.body;
  if (!description || !email) {
    return res.status(422).json({ error: "Please add all the fields" });
  } else {
    User.findOne({ email: email })
      .then(async (savedUser) => {
        if (savedUser) {
          savedUser.description = description;
          savedUser
            .save()
            .then((user) => {
              return res
                .status(422)
                .json({ message: "Description update successfully" });
            })
            .catch((error) => {
              return res.status(422).json({ error: "Server Error" });
            });
        } else {
          return res.status(422).json({ error: "Invalid Credentials" });
        }
      })
      .catch((error) => {
        return res.status(422).json({ error: "Server Error" });
      });
  }
});

router.post("/searchuser", (req, res) => {
  const { keyword } = req.body;
  if (!keyword) {
    return res.status(422).json({ error: "Please search a username" });
  } else {
    User.find({ username: { $regex: keyword, $options: "i" } })
      .then((user) => {
        let data = [];
        user.map((item) => {
          data.push({
            _id: item._id,
            username: item.username,
            email: item.email,
            description: item.description,
            profilePic: item.profilePic,
          });
        });
        if (data.length == 0) {
          return res.status(422).json({ error: "No User Found" });
        }
        return res.status(200).json({ message: "User Found", user: data });
      })
      .catch((error) => {
        return res.status(422).json({ error: "Server Error" });
      });
  }
});

// get otheruserdata
router.post("/otheruserdata", (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        let data = {
          _id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
          description: savedUser.description,
          profilePic: savedUser.profilePic,
          followers: savedUser.followers,
          following: savedUser.following,
          posts: savedUser.posts,
        };
        return res.status(200).json({ message: "User Found", user: data });
      } else {
        return res.status(422).json({ error: "User Not Found" });
      }
    })
    .catch((error) => {
      return res.status(422).json({ error: "Server Error" });
    });
});

// check follow
router.post("/checkfollow", (req, res) => {
  const { followfrom, followto } = req.body;
  // followfrom = my email
  // followto = friend email
  if (!followfrom || !followto) {
    return res.status(422).json({ error: "Invalid Credentials" });
  }
  User.findOne({ email: followfrom })
    .then((savedUser) => {
      if (savedUser) {
        let data = savedUser.following.includes(followto);
        if (data == true) {
          return res.status(200).json({ message: "User in following list" });
        } else {
          return res
            .status(422)
            .json({ message: "User not in following list" });
        }
      } else {
        return res.status(422).json({ error: "Invalid Credentials" });
      }
    })
    .catch((error) => {
      return res.status(422).json({ error: "Server Error" });
    });
});

// follow user
router.post("/followuser", (req, res) => {
  const { followfrom, followto } = req.body;
  if (!followfrom || !followto) {
    return res.status(422).json({ error: "Invaid Credentials" });
  } else {
    User.findOne({ email: followfrom }).then((mainuser) => {
      if (mainuser) {
        if (mainuser.following.includes(followto)) {
          return res.status(422).json({ error: "Already Following" });
        } else {
          mainuser.following.push(followto);
          mainuser.save();
        }
        //
        User.findOne({ email: followto }).then((otheruser) => {
          if (otheruser) {
            if (otheruser.followers.includes(followfrom)) {
              return res.status(422).status({ error: "Already Following" });
            } else {
              otheruser.followers.push(followfrom);
              otheruser.save();
              return res.status(200).json({ message: "User Followed" });
            }
          } else {
            return res.status(422).json({ error: "Invalid Credentials" });
          }
        });
      }
    });
  }
});

// unfollow user
router.post("/unfollowuser", (req, res) => {
  const { followfrom, followto } = req.body;
  if (!followfrom || !followto) {
    return res.status(422).json({ error: "Invaid Credentials" });
  } else {
    User.findOne({ email: followfrom }).then((mainuser) => {
      if (mainuser) {
        if (mainuser.following.includes(followto)) {
          mainuser.following.pull(followto);
          mainuser.save();
        } else {
          return res.status(422).json({ error: "Invalid Credentials" });
        }

        User.findOne({ email: followto }).then((otheruser) => {
          if (otheruser) {
            if (otheruser.followers.includes(followfrom)) {
              otheruser.followers.pull(followfrom);
              otheruser.save();
              return res.status(200).json({ message: "User Unfollowed" });
            }
          } else {
            return res.status(422).json({ error: "Invalid Credentials" });
          }
        });
      } else {
        return res.status(422).json({ error: "Invalid Credentials" });
      }
    });
  }
});

module.exports = router;
