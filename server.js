const express = require("express");
const {comment_routes, post_routes, user_routes, view_routes} = require("./controllers")
const {engine} = require("express-handlebars");
const session = require("express-session");

const PORT = process.env.PORT || 3001;

// server app
const app = express();

// used to parse URL encoded data from incoming requests URL endcoded data is sent in the body of HTML forms, 
// we need this since were using handlebars.js
app.use(express.urlencoded({extended: false}));

// loading session middleware
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true
}))


app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');


// allow json to be sent by client
// app.use(express.json());

app.use(express.static("public"));

// loading routes at the root level
app.use("/", [post_routes, view_routes, comment_routes]);
// loading usr_routes at /auth
app.use("/auth", user_routes)



app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON port: ${PORT}`);
});