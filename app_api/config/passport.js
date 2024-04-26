const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('user');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, (email, password, done) => {
    User.findOne({ email: email }).exec()  // Using exec() to return a promise
        .then(user => {
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        })
        .catch(err => done(err)); // Properly catch and forward any errors
}));

// passport.use(new LocalStrategy({
//     usernameField: 'email'
// }, (email, password, done) => {
//     User.findOne({ email: email }, (err, user) => {
//         console.log('Authenticating user:', email);
//         if (err) {
//             console.log('Error fetching user:', err);
//             return done(err);
//         }
//         if (!user) {
//             console.log('User not found:', email);
//             return done(null, false, { message: 'Incorrect username.' });
//         }
//         if (!user.validPassword(password)) {
//             console.log('Invalid password for:', email);
//             return done(null, false, { message: 'Incorrect password.' });
//         }
//         console.log('User authenticated successfully:', email);
//         return done(null, user);
//     });
// }));