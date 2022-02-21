const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

// routes
const emlaei = require("./routes/emlaei");
const farhangestan = require("./routes/farhangestan");
const ganjvar = require("./routes/ganjvar");
const motaradef = require("./routes/motaradef");
const sereh = require("./routes/sereh");
const teyfi = require("./routes/teyfi");

// middlewares
app.use(cors());

// dev only
if (app.get("env") === "development") {
  app.use(morgan("dev"));
  console.log("DEV: Morgan enabled");
}

// routes middlewares
app.use("/api/emlaei", emlaei);
app.use("/api/farhangestan", farhangestan);
app.use("/api/ganjvar", ganjvar);
app.use("/api/motaradef", motaradef);
app.use("/api/sereh", sereh);
app.use("/api/teyfi", teyfi);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
