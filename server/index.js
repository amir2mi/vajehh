const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const morgan = require("morgan");
const dehkhoda = require("./routes/dehkhoda");
const teyfi = require("./routes/teyfi");
const motaradef = require("./routes/motaradef");
const sereh = require("./routes/sereh");
const farhangestan = require("./routes/farhangestan");
const ganjvar = require("./routes/ganjvar");
const emlaei = require("./routes/emlaei");
const dynamicHTML = require("./routes/dynamic-html");
const chat = require("./routes/chat");
const path = require("path");
const gzipStatic = require("connect-gzip-static");

// Connect to MongoDB Atlas client
// each MongoDB cluster can have only three collection with Atlas search feature
// first => motaradef, sereh, teyfi
const firstDatabaseClient = new MongoClient(process.env["VAJEHH_FIRST_DB_URL"]);
// second => farhangestan, ganjvar, dehkhoda
const secondDatabaseClient = new MongoClient(process.env["VAJEHH_SECOND_DB_URL"]);

// Middlewares
const app = express();
app.use(express.json());

const allowedOrigin = process.env["NODE_ENV"] === "production" ? "https://vajehh.com" : "http://localhost:3000";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST"],
  })
);

// Dev only middlewares
if (app.get("env") === "development") {
  app.use(morgan("dev"));
  console.info("✨ Morgan enabled");
}

// Routes
// this route modify the index.html file and replace the special strings with server generated strings,
// the example can be page title and meta tags

app.use("/", dynamicHTML);
app.use("/api/chat", chat);
app.use("/api/dehkhoda", dehkhoda);
app.use("/api/teyfi", teyfi);
app.use("/api/motaradef", motaradef);
app.use("/api/sereh", sereh);
app.use("/api/farhangestan", farhangestan);
app.use("/api/ganjvar", ganjvar);
app.use("/api/emlaei", emlaei);

// Serve original static files
// app.use(express.static(path.resolve(__dirname, process.env["VAJEHH_CLIENT_PATH"])));

// Serve gzipped static files
app.use(gzipStatic(path.resolve(__dirname, process.env["VAJEHH_CLIENT_PATH"]), { maxAge: 86400000 }));

// redirect all other routes to the index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, process.env["VAJEHH_CLIENT_PATH"], "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, async () => {
  console.info(`🌐 Listening on port ${port}`);

  // connect to the first database and share it with all routes
  try {
    await firstDatabaseClient.connect();
    const database = firstDatabaseClient.db("vajehh");
    app.locals.firstDatabase = database;
    console.info(`✅ Successfully connected to the first database`);
  } catch (e) {
    console.error("❌ Error happened when connecting to the first database", e);
  }

  // connect to the second database and share it with all routes
  try {
    await secondDatabaseClient.connect();
    const database = secondDatabaseClient.db("vajehh");
    app.locals.secondDatabase = database;
    console.info(`✅ Successfully connected to the second database`);
  } catch (e) {
    console.error("❌ Error happened when connecting to the second database", e);
  }

  // connect to OpenAi client and share it with all routes
  try {
    const openaiConfig = new Configuration({
      apiKey: process.env["VAJEHH_OPENAI_SECRET"],
    });
    const openai = new OpenAIApi(openaiConfig);
    app.locals.openai = openai;
    console.info(`✅ Successfully connected to OpenAi client`);
  } catch (e) {
    console.error("❌ Error happened when connecting to the OpenAi client", e);
  }
});
