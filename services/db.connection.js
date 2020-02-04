const mongoose = require("mongoose");

const dbUrl = require("../config/keys").mongoURI; //process.env.DATABASE_URL

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB connection is successful!"))
  .catch(err => console.log("Error with connection! ", err));
