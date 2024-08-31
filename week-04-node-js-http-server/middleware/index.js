const express = require("express");

const app = express();

function isOldEnough(age) {
  if (age >= 14) {
    return true;
  } else {
    return false;
  }
}

app.get("/ride1", function (req, res) {
  if (isOldEnough(req.query.age)) {
    res.json({
      msg: "You have successfully riden the ride 1",
    });
  } else {
    res.json({
      msg: "Sorry ypu are not of age yet",
    });
  }
});

app.get("/ride2", function (req, res) {
  if (isOldEnough(req.query.age)) {
    res.json({
      msg: "You have successfully riden the ride 1",
    });
  } else {
    res.json({
      msg: "Sorry ypu are not of age yet",
    });
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
