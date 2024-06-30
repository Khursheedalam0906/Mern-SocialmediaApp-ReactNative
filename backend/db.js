const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(process.env.mongo_URL)
  .then((response) => {
    console.log("database is connected");
  })
  .catch((error) => {
    console.log(`Database is not connected + ${error}`);
  });
