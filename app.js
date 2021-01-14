const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const dbURI =
  "mongodb+srv://admin:123321@practice.lls3e.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("connected to db"))
  .catch((err) => console.log(err));

const app = express();

app.set("view engine", "ejs");

app.listen(3000, () => console.log("Listening on Port 3000"));

app.use(express.static("public")).use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
