const express = require("express");
const api_routes = require("./controllers")

const {engine} = require("express-handlebars");
const session = require("express-session");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true
}))
// allow json to be sent by client
app.use(express.json());

app.use(express.static("public"));

app.use("/", api_routes);

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON port: ${PORT}`);
});