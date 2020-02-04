const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
require("./services/db.connection");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "50mb",
    parameterLimit: 1000000
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

const users = require("./routes/users");
app.use("/api/user", users);

const forgetPassword = require("./routes/forgetPassword");
app.use("/api/account", forgetPassword);

const templates = require("./routes/templates");
app.use("/api/templates", templates);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
  );
}

const server = {
  host: "http://localhost",
  port: 3123
};

const port = process.env.PORT || server.port;
app.listen(port, () => {
  console.log(`Listening on ${server.host}:${port} ..`);
});
