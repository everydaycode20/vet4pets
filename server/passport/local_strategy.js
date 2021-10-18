const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const connectionDb = require("../utils/database_connection");

const comparePassword = require("../utils/comparePasswords").comparePassword;

passport.use(new LocalStrategy(( user, password, done) => {
    
    connectionDb.query("select * from adminUser where user = ?", [ user ], (err, rows) => {
        
        if (!rows.length) {
            return done(null, false);
        }
        else{
            const isValid = comparePassword(password, rows[0].password);
                
                if (isValid) {
                    done(null, rows[0]);
                }
                else{
                    done(null, false);
                }
                
        }

    });
}));

passport.serializeUser(( user, done ) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {

    connectionDb.query("select * from adminUser where id = ?", [ id ], (err, rows) => {
        done(null, rows[0]);
    });

});