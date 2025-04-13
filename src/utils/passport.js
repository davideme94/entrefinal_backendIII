import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const cookieExtractor = req => req?.cookies?.jwt || null;

passport.use("jwt", new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.JWT_SECRET
}, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

export default passport;
