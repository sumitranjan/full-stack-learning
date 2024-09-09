const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const DATA_FILE = path.join(__dirname, "users.json");

// Function to lad users from the JSON file
function loadUsers() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }

  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
}

// Function to save users to the JSON file
function saveUsers(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

const users = loadUsers();

function inputValidation(req, res, next) {
  const { username, password } = req.body;
  console.log("body :", req.body);

  if (username.trim() === "" || username === undefined) {
    return res
      .status(400)
      .json({ error: "Username is required or can't be empty" });
  }
  if (password.trim() === "" || password === undefined) {
    return res
      .status(400)
      .json({ error: "password is required can't be empty" });
  }
  next();
}

function generateToken() {
  let options =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let token = "";
  for (let i = 0; i < 32; i++) {
    // use a simple function here
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
}

app.post("/signup", inputValidation, function (req, res) {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  console.log("user : ", user);
  if (user) {
    return res.json({ message: "User already exist" });
  }
  users.push({ username, password });
  saveUsers(users);

  res.json({ message: "You have signed up" });
});

app.post("/signin", inputValidation, function (req, res) {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = generateToken();
    user.token = token;

    res.json({ token });
    console.log(users);
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }
});

app.get("/me", function (req, res) {
  const token = req.headers.authorization;
  // Check if the token is undefined or empty
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }
  const user = users.find((user) => user.token === token);

  if (user) {
    res.json({ username: user.username });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
