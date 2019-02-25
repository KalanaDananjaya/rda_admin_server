const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const loginController = require('../controllers/loginController');

module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = "Asdad73@fds" //todo: replace secreat in production and hide the value
    passport.use(new JWTStrategy(opts, (jwtPayload, done) => {
        loginController.getUserByUID(jwtPayload.uid, (err, user)=> {
            if (err){
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}