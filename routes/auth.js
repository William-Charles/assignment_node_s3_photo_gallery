const express = require("express");
const router = express.Router();
const models = require("../models");
const User = models.User;

router.get("/", (req, res) => {
  if (req.user) {
    res.redirect("/photos");
  } else {
    res.redirect("/login");
  }
});

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/photos");
  } else {
    res.render("auth/login");
  }
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", (req, res) => {
  const {email, password} = req.body;
  User.create({email, password}).then(user => {
    req.login(user, err => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});
module.exports = router;
