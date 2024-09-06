const express = require("express");

const app = express();

app.get("/sum/:num1/:num2", function (req, res) {
  const num1 = Number(req.params.num1);
  const num2 = Number(req.params.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: "Invalid request" });
  }
  res.status(200).json({ sum: num1 + num2 });
});

app.get("/subtract/:num1/:num2", function (req, res) {
  const num1 = Number(req.params.num1);
  const num2 = Number(req.params.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: "Invalid request" });
  }
  res.status(200).json({ subtract: num1 - num2 });
});

app.get("/multiply/:num1/:num2", function (req, res) {
  const num1 = Number(req.params.num1);
  const num2 = Number(req.params.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: "Invalid request" });
  }
  res.status(200).json({ mutltiply: num1 * num2 });
});

app.get("/divide/:num1/:num2", function (req, res) {
  const num1 = Number(req.params.num1);
  const num2 = Number(req.params.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: "Invalid request" });
  }
  res.status(200).json({ divide: num1 / num2 });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
