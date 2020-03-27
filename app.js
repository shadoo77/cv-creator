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

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

//access for anywhere on the server
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});

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

app.use((req, res, next) => {
  const error = new Error("inserted request is not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ Error: error.message });
});

const server = {
  host: "http://localhost",
  port: 3123
};

const port = process.env.PORT || server.port;
app.listen(port, () => {
  console.log(`Listening on ${server.host}:${port} ..`);
});
