const express = require("express");
const app = express();
const cors = require("cors");
const crud = require("./Routes/crud");
const user = require("./Routes/userAuth");
const mongoose = require("mongoose");
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log("Server Started");
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.get("/", (req, res) => {
  res.send("Server Started");
});

app.use("/api", crud);
app.use("/api", user);
