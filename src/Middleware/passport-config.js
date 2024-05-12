import { Strategy as LocalStrategy } from "passport-local";
import UserModel from "../Models/User.model.js";
import bcrypt from "bcryptjs";

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return done(null, false, { message: "No user with that email" });
      }

      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

export default initialize;
