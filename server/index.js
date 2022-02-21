const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const morgan = require("morgan");
const motaradef = require("./routes/motaradef");

// connect to MongoDB Atlas client
// first => motaradef, sereh, teyfi
const firstDatabaseClient = new MongoClient(process.env["VAJEHH_FIRST_DB_URL"]);
// second => farhangestan, ganjvar, emlaei
const secondDatabaseClient = new MongoClient(process.env["VAJEHH_SECOND_DB_URL"]);

// express app and middlewares
const app = express();
app.use(cors());

// dev only middlewares
if (app.get("env") === "development") {
  app.use(morgan("dev"));
  console.info("Morgan enabled");
}

// routes
app.use("/api/motaradef", motaradef);

const port = process.env.PORT || 8080;
app.listen(port, async () => {
  console.info(`Listening on port ${port}`);

  // connect to the first database and share it with all routes
  try {
    await firstDatabaseClient.connect();
    const database = firstDatabaseClient.db("vajehh");
    app.locals.firstDatabase = database;
    console.info(`Successfully connected to the first database`);
  } catch (e) {
    console.error("error connecting to the first database", e);
  }

  // connect to the second database and share it with all routes
  try {
    await secondDatabaseClient.connect();
    const database = secondDatabaseClient.db("vajehh");
    app.locals.secondDatabase = database;
    console.info(`Successfully connected to the second database`);
  } catch (e) {
    console.error("error connecting to the second database", e);
  }
});
