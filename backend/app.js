const express = require("express");
const cors = require("cors");

const users = require("./routes/users");
const movies = require("./routes/movies");
const reviews = require("./routes/reviews");
const shares = require("./routes/shares");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", users);
app.use("/api/movies", movies);
app.use("/api/reviews", reviews);
app.use("/api/shares", shares);

module.exports = app;
