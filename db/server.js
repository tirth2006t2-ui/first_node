const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser"); // 1. Import it early
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

// 2. MUST BE ABOVE ROUTES
app.use(bodyParser.json()); 

const Person = require("../Model/Person");
const Menu = require("../Model/Menu");
const personRouter = require("../exp/person_rout");
const menuRouter = require("../exp/menu_rout");

// 3. Routes come after middleware
passport.use(new localStrategy(async (username, password, done) => {
  try {
    const user = await Person.findOne({ name: username, mobile: password })
    if (!user) {
      return done(null, false, { message: "Incorrect username or password." });
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
}));

app.use("/person", personRouter);
app.use("/menu", menuRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});