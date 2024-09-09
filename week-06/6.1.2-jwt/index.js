const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const users = [];

const JWT_SECRET = "USER_APP";

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  users.push({ username, password });

  res.send({
    message: "You have signed up",
  });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = jwt.sign({ username: user.username }, JWT_SECRET);

    user.token = token;
    res.send({
      token,
    });
    console.log("users:", users);
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }
});

app.get("/me", (req, res) => {
  const token = req.headers.authorization;
  const decodedInformation = jwt.verify(token, JWT_SECRET); // {username: "sumit@gmail.com"}
  const unAuthDecodedinfo = jwt.decode(token); // {username: "sumit@gmail.com"}
  console.log("decodedInformation:", decodedInformation);
  console.log("unAuthDecodedinfo:", unAuthDecodedinfo);

  const username = decodedInformation.username;
  const user = users.find((user) => user.username === username);

  if (user) {
    res.json({
      username: user.username,
    });
  } else {
    res.json({
      message: "token invalid",
    });
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000"); //that the http server is listening on post 3000
});
