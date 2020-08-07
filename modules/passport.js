const passport = require("passport");
const User = require("../models/User");
const GithubStrategy = require("passport-github").Strategy;

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      const user = {
        username: profile.username,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        imageUrl: (profile.photos.length && profile.photos[0].value) || "",
      };
      User.create(user, (err, createdUser) => {
        console.log(err);
        if (err) return cb(null, false);
        console.log(createdUser);
        cb(null, createdUser);
      });
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log(user);
  cb(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, (err, user) => {
    if (err) return done(null, false);

    done(null, user);
  });
});
