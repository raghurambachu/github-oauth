var express = require("express");
const passport = require("passport");

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  function (req, res) {
    console.log(req.session);
    console.log(req.user);
    // Successful authentication, redirect home.
    res.send("Successfully authenticated. Session Created");
  }
);

module.exports = router;
