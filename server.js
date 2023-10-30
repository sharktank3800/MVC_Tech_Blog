const express = require("express");
const {post_routes, user_routes, view_routes} = require("./controllers")

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static("public"));

app.use("/", view_routes);

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON port: ${PORT}`);
});