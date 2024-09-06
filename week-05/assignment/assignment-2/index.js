const express = require("express");
var url = require("url");

const app = express();

function requestLogger(req, res, next) {
  const currentTime = new Date();
  /*
  let fullUrl = url.format({
    protocol: req.protocol,
    host: req.get("host"),
    pathname: req.originalUrl,
  });
  console.log("url :", fullUrl);
  */

  // Log the HTTP method, Complete URL, and timestamp to the console
  console.log(req.method);
  console.log(`${req.protocol}://${req.get("host")}${req.url}`);
  console.log(currentTime);

  next();
}

// Use the middleware in the app
app.use(requestLogger);

app.get("*", (req, res) => {
  res.send("Get Request");
});

app.post("*", (req, res) => {
  res.send("Post Request!");
});

app.put("*", (req, res) => {
  res.send("Put Request!");
});

app.delete("*", (req, res) => {
  res.send("Delete Request!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
