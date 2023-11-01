const express = require("express");
const view_routes = require("./controllers/view_routes");
const post_routes = require("./controllers/post_routes");
const user_routes = require("./controllers/user_routes");
const comment_routes = require("./controllers/comment_routes");
const { engine } = require("express-handlebars");
const session = require("express-session");
const db = require("./config/connection");

const port = process.env.PORT || 3306;

// server app
const app = express();

// used to parse URL encoded data from incoming requests and URL endcoded data is sent in the body of HTML forms,
// we need this since were using handlebars.js
app.use(express.urlencoded({ extended: false }));

// loading session middleware
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// allow json to be sent by client
// app.use(express.json());

app.use(express.static("public"));

// loading routes at the root level
app.use("/", [post_routes, view_routes, comment_routes]);
// loading usr_routes at /auth
app.use("/auth", user_routes);

db.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON port: ${port}`);
  });
}).catch((err) => {
    console.error("Database sync error:", err);
})
