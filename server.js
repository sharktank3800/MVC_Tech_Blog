const express = require("express");
const view_Routes = require("./controllers/view_routes")

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static("public"));

app.use("/", view_Routes);

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON port: ${PORT}`);
});