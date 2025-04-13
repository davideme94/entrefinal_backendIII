import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import { createHash, isValidPassword } from "../utils/hash.js";
import UserModel from "../models/users.model.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  // Login local
  passport.use("login", new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user || !isValidPassword(password, user.password)) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  // Estrategia JWT
  passport.use("jwt", new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([
      req => req?.cookies?.token
    ]),
    secretOrKey: process.env.JWT_SECRET
  }, async (jwt_payload, done) => {
    try {
      return done(null, jwt_payload.user);
    } catch (err) {
      return done(err);
    }
  }));
};

export default initializePassport;
