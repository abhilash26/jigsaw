/**
 *  CONSTANTS DECLARATION
 */
const express = require("express");
const app = express();
const path = require("path");
const router = require("./core/router");
const port = process.env.PORT || 5000;


/** App Settings */
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use("/", router);

/**Create and assign server */
const server = require("http").createServer(app);
const io = require("socket.io")(server);
socket = require("./core/socket")(io);

/**App Listen */
server.listen(port, () => console.log(`App listening on port ${port}!`));
