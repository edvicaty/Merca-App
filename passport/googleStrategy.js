const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (acessToken, refreshToken, profile, done) => {
      console.log(profile);
      const user = await User.findOne({ googleID: profile.id });
      if (!user) {
        const newUser = await User.create({
          googleID: profile.id,
          email: profile.emails[0].value,
        });
        done(null, newUser);
      }
      done(null, user);
    }
  )
);
