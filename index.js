import express from "express";
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  const data = {
    title: "JLong Blog",
    seconds: new Date().getSeconds(),
  };
  res.render("index.ejs", data);
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});