const express = require("express");

const app = express();

let requestCount = 0;

// create a middleware function that logs the total number of requests
function requestIncreaser(req, res, next) {
  requestCount++;

  console.log(`Total Number of Requests = ${requestCount}`);

  // call the next middleware function in the stack
  next();
}

/**
 * This way of defining middleware is called global middleware, which is used for all routes
 */

// use the requestIncreaser middleware for all routes
app.use(requestIncreaser);

app.get("/sum", function (req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  res.json({
    ans: a + b,
  });
});

app.get("/subtract", function (req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  res.json({
    ans: a - b,
  });
});

app.get("/multiply", function (req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  res.json({
    ans: a * b,
  });
});

app.get("/divide", function (req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  res.json({
    ans: a / b,
  });
});

app.listen(3000);
