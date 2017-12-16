const express = require("express");
const app = express();
const fs = require("fs");
const hbs = require("hbs");

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to server.log.");
    } else {
      console.log("server.log updated.");
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance", {
//     pageTitle: "Maintenance Page"
//   });
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => text.toUpperCase());

app.get("/", (req, res) => {
  // res.send(`<h1>Hello Express!</h1>`);
  res.render("home", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to my Site"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to handle request"
  });
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
