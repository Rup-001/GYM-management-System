// src/middleware/passport.ts
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import User from "../modules/models/user.model"; // adjust path to your user model
import { IUser } from "../modules/models/user.model"; // Type for User
import { Request } from "express";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY as string,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload: any, done) => {
    try {
      const user: IUser | null = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
