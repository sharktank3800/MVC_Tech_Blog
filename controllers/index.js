const router = require("express").Router();

const comment_routes = require("./comment_routes");
const post_routes = require("./post_routes");
const user_routes = require("./user_routes");
const view_routes = require("./view_routes");

router.use("/", [
    comment_routes,
    post_routes,
    user_routes,
    view_routes
])

module.exports = router;