const express = require("express");
const app = express();
const morgan = require("morgan");
const sereh = require("./routes/sereh");
const teyfi = require("./routes/teyfi");

// middleware
app.use(morgan("dev"));

// routes
app.use("/api/sereh", sereh);
app.use("/api/teyfi", teyfi);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
