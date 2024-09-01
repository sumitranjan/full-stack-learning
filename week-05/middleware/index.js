// const express = require("express");

// const app = express();

// let requestCount = 0;

// function requestIncreaser(req, res, next) {
//   requestCount = requestCount + 1;
//   console.log("Total Number of requests = " + requestCount);
//   req.name = "randomsumit123";

//   //   res.json({
//   //     message: "I end the request early",
//   //   });
//   next();
// }

// function realSumHandler(req, res) {
//   const a = parseInt(req.query.a);
//   const b = parseInt(req.query.b);
//   console.log(req.name);

//   res.json({
//     ans: a + b,
//   });
// }

// // global middleware
// // All route after this can use the middleware
// app.use(requestIncreaser);

// app.get("/sum", requestIncreaser, realSumHandler);

// app.get("/multiply", requestIncreaser, realSumHandler);

// app.listen(3000, () => {
//   console.log("Listening on port 3000");
// });

// //-------------
// const express = require("express");

// const app = express();

// function loggerMiddleware(req, res, next) {
//   console.log("Method is " + req.method);
//   console.log("Method is " + req.hostname);
//   console.log("Current Time " + new Date());

//   next();
// }

// app.use(loggerMiddleware);

// app.get("/sum", function (req, res) {
//   const a = parseInt(req.query.a);
//   const b = parseInt(req.query.b);

//   res.json({
//     ans: a + b,
//   });
// });

// app.get("/multiply", function (req, res) {
//   const a = parseInt(req.query.a);
//   const b = parseInt(req.query.b);
//   res.json({
//     ans: a * b,
//   });
// });

// app.get("/divide", function (req, res) {
//   const a = parseInt(req.query.a);
//   const b = parseInt(req.query.b);
//   res.json({
//     ans: a / b,
//   });
// });

// app.get("/subtract", function (req, res) {
//   const a = parseInt(req.query.a);
//   const b = parseInt(req.query.b);
//   res.json({
//     ans: a - b,
//   });
// });

// app.listen(3000);

// //------------

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.post("/sum", function (req, res) {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  res.json({
    ans: a + b,
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
