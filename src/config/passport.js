const LocalStrategy = require("passport-local").Strategy;
const User = require("../app/models/user");

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  //SignUp
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },

      function (req, email, password, done) {
        User.findOne({ local: email }, function (err, user) {
          if (err) {
            return done(err);
          }
          if (user) {
            return done(
              null,
              false,
              req.flash("signupMessage", "El E-Mail ya existe.")
            );
          } else {
            var newUser = new User();
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.save(function (err) {
              if (err) {
                throw err;
              }
              return done(null, newUser);
            });
          }
        });
      }
    )
  );

  //Login
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },

      function (req, email, password, done) {
        User.findOne({ email: email }, function (err, user) {
          if (err) {
            return done(err);
          }

          if (!user) {
            return done(
              null,
              false,
              req.flash("loginMessage", "El usuario no existe.")
            );
          }

          if (!user.validatePassword(password)) {
            return done(
              null,
              false,
              req.flash("loginMessage", "Contraseña Incorrecta.")
            );
          }

          return done(null, user);
        });
      }
    )
  );
}; // Fin module.exports
