const express = require("express");

const app = express();

// create a global variable requestCount and assign it a value of 0 to store the total number of requests
let requestCount = 0;

// Middleware to count incoming requests
function countRequests(req, res, next) {
  requestCount++;

  next();
}

app.use(countRequests);

app.get("/requestCount", (req, res) => {
  res.json({ totalRequest: requestCount });
});

app.get("*", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
