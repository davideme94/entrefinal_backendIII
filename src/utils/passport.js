import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/users.model.js";
import dotenv from "dotenv";

dotenv.config();

// 🔐 Extrae el JWT desde las cookies
const cookieExtractor = req => req?.cookies?.jwt || null;

// 🔐 Configura la estrategia JWT
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

// ✅ Exporta passport
export default passport;

// ✅ Exporta passportCall para usar como middleware en rutas protegidas
export const passportCall = (strategy) => (req, res, next) => {
  passport.authenticate(strategy, { session: false }, function (err, user, info) {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info?.message || "Unauthorized" });
    req.user = user;
    next();
  })(req, res, next);
};
