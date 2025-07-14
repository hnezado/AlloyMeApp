const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const configFn = require("./config");
const User = require("./models/User.model");
const https = require("https");
const fs = require("fs");

// Express
const app = express();
let config;

function initialize() {
  try {
    config = configFn.getConfig();
    setUpMiddleware(config);
    setUpRoutes();

    // https.createServer(getHttpsOptions(), app).listen(config.PORT, () => {
    //   console.log(`Listening on port ${config.PORT}`);
    // });
    app.listen(config.PORT, () => {
      console.log(`Listening on port ${config.PORT}`);
    });
  } catch (err) {
    console.error("Error resolving configuration", err);
  }
}

function setUpMiddleware(config) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(flash());

  // Session
  app.use(
    session({
      secret: config.session.SECRET,
      resave: true,
      saveUninitialized: true,
    })
  );

  initPassport();
  initDb();

  // Express View engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "hbs");
  app.use(express.static(path.join(__dirname, "public")));
  app.use(favicon(path.join(__dirname, "public", "images", "favicon.png")));
}

function initDb() {
  mongoose
    .connect(
      `mongodb+srv://${config.db.auth.USER}:${config.db.auth.PASS}@${config.db.HOST}/${config.db.NAME}?retryWrites=true&w=majority`,
    )
    .then((res) => {
      console.log(
        `Connected to Mongo! Database name: "${config.db.NAME}"`
      );
    })
    .catch((err) => {
      console.error("Error connecting to mongo", err);
    });
}

function initPassport() {
  passport.serializeUser((user, callback) => {
    callback(null, user._id);
  });
  passport.deserializeUser((id, callback) => {
    User.findById(id)
      .then((result) => {
        callback(null, result);
      })
      .catch((err) => {
        callback(err);
      });
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, username, password, next) => {
        User.findOne({ username: username.toLowerCase() })
          .then((user) => {
            if (!user) {
              // If the user doesn't exist
              return next(null, false, { message: "Incorrect username" });
            }
            if (!bcrypt.compareSync(password, user.password)) {
              // If the password is correct
              return next(null, false, { message: "Incorrect password" });
            }
            return next(null, user); // If the login is successful, it passes "user"
          })
          .catch((err) => {
            console.log(err);
          });
      }
    )
  );

  app.use(passport.initialize());
  app.use(passport.session());
}

function setUpRoutes() {
  app.use("/", require("./routes/index.routes"));
  app.use("/", require("./routes/auth.routes"));
  app.use("/", require("./routes/userData.routes"));
  app.use("/", require("./routes/elements.routes"));
  app.use("/", require("./routes/alloyData.routes"));
  app.use("/", require("./routes/testData.routes"));
}

function getHttpsOptions() {
  return {
    cert: fs.readFileSync(config.httpsServer.CERT_PATH),
    key: fs.readFileSync(config.httpsServer.PRIV_KEY),
  };
}

initialize();
