const express = require("express");

const app = express();

// create a global variable requestCount to store the total number of requests
let requestCount = 0;

// create a middleware function that logs the total number of requests
function requestIncreaser(req, res, next) {
  // increment the requestCount by 1
  requestCount++;

  // log the total number of requests
  console.log(`Total Number of Requests = ${requestCount}`);

  // end the request early by sending a response
  //   res.json({
  //     message: "I ended the request early",
  //   });

  // call the next middleware function in the stack
  next();
}

/**
 * This way of difiing middleware is called inline middleware, which is used for a single route
 */

function realSumHandler(req, res) {
  console.log("Control reached the real sum handler");

  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  res.json({
    ans: a + b,
  });
}

function realMultiplyHandler(req, res) {
  console.log("Control reached the real multiply handler");

  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  res.json({
    ans: a * b,
  });
}

app.get("/sum", requestIncreaser, realSumHandler);

app.get("/multiply", requestIncreaser, realMultiplyHandler);

app.listen(3000);
