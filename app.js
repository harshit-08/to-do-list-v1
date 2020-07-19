const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();


let items = ["Buy Food", "Cook Food"];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  let day = date.getDate();
  res.render("list", {
    listTitle: day,
    newItems: items
  });
});

app.post("/", function(request, response) {
  let item = request.body.newItem;
  if (request.body.list === "Work") {
    workItems.push(item);
    response.redirect("/work");
  } else {
    items.push(item);
    response.redirect("/");
  }
});
app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work",
    newItems: workItems
  })
});
app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("running");
});
