const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");
const gzipStatic = require("connect-gzip-static");
const cors = require("cors");
const morgan = require("morgan");
// const dynamicHTML = require("./routes/dynamic-html");
const motaradef = require("./routes/motaradef");
const sereh = require("./routes/sereh");
const teyfi = require("./routes/teyfi");
const farhangestan = require("./routes/farhangestan");
const ganjvar = require("./routes/ganjvar");
const emlaei = require("./routes/emlaei");
const staticDir = "../client/build";

// Connect to MongoDB Atlas client
// each MongoDB cluster can have only three collection with Atlas search feature
// first => motaradef, sereh, teyfi
const firstDatabaseClient = new MongoClient(process.env["VAJEHH_FIRST_DB_URL"]);
// second => farhangestan, ganjvar
const secondDatabaseClient = new MongoClient(process.env["VAJEHH_SECOND_DB_URL"]);

// Middlewares
const app = express();
app.use(cors());

// Dev only middlewares
if (app.get("env") === "development") {
  app.use(morgan("dev"));
  console.info("Morgan enabled");
}

// Routes
// this route modify the index.html file and replace the special strings with server generated strings,
// the example can be page title and meta tags

// app.use("/", dynamicHTML);
app.use("/api/motaradef", motaradef);
app.use("/api/sereh", sereh);
app.use("/api/teyfi", teyfi);
app.use("/api/farhangestan", farhangestan);
app.use("/api/ganjvar", ganjvar);
app.use("/api/emlaei", emlaei);

// Serve original static files
// app.use(express.static(path.resolve(__dirname, staticDir)));

// // Serve gzipped static files
// app.use(gzipStatic(path.resolve(__dirname, staticDir), { maxAge: 86400000 }));

// // redirect all other routes to the index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, staticDir, "index.html"));
// });

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
