/**
 * Does not reuire the last file as the direct routing had been implemented.
 * URL: https://stackoverflow.com/questions/53915510/req-body-username-and-req-body-password-are-undefined
 * URl: https://www.linkedin.com/pulse/building-simple-secure-api-rest-nodejs-carlos-sánchez-valdez/
 * URL: https://www.loginradius.com/blog/engineering/hashing-user-passwords-using-bcryptjs/
 */
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");

const User = require("../db/User");
const JobApplicant = require("../db/JobApplicant");
const Recruiter = require("../db/Recruiter");

const router = express.Router();

router.post("/sign", (req, res) => {
  const info = req.body;
  let user = new User({
    mail: info.mail,
    pass: info.pass,
    type: info.type,
  });

  user
    .save()
    .then(() => {
      const userDetails =
        user.type == "reecruit"
          ? new Recruiter({
              userId: user._id,
              na: info.na,
              contactNumber: info.contactNumber,
              bio: info.bio,
            })
          : new JobApplicant({
              userId: user._id,
              na: info.na,
            });

      userDetails
        .save()
        .then(() => {
          // Token
          const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
          res.json({
            token: token,
            type: user.type,
          });
        })
        // Static try catch from stackoverflow
        .catch((err) => {
          user
            .delete()
            .then(() => {
              res.status(400).json(err);
            })
            .catch((err) => {
              res.json({ error: err });
            });
          err;
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401).json(info);
        return;
      }
      // Token
      const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
      res.json({
        token: token,
        type: user.type,
      });
    }
  )(req, res, next);
});

module.exports = router;
