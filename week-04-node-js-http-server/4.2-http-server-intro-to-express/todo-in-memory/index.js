const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let todos = [
  {
    id: 1,
    title: "Buy Laptop",
    completed: false,
    description: "Buy Apple laptop",
  },
];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Validate if the ID is a valid number
  if (isNaN(id)) {
    return res.status(400).json({ error: "Id is invalid" });
  }
  const todo = todos.find((todo) => todo.id === Number(id));

  if (!todo) {
    res.status(404).json("Todo not found");
  }

  res.status(200).json(todo);
});

app.post("/todos", (req, res) => {
  const { title, completed = false, description = "" } = req.body;
  const id = todos.length + 1;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  todos.push({ id, title, completed, description });

  res.status(201).json({ todos });
});

// Updated Code Using `find`
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Update the todo with new values from the request body
  const { title, completed, description } = req.body;

  // Validate if the ID is a valid number
  if (isNaN(id)) {
    return res.status(400).json({ error: "Id is invalid" });
  }

  const todo = todos.find((todo) => todo.id === id);

  // If the todo is not found, return a 404 error
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;
  if (description !== undefined) todo.description = description;

  // Return the updated todo
  res.status(200).json(todo);
});

// // Updated Code Using `findIndex`
// app.put("/todos/:id", (req, res) => {
//   const id = parseInt(req.params.id);

//   // Update the todo with new values from the request body
//   const { title, completed, description } = req.body;

//   // Validate if the ID is a valid number
//   if (isNaN(id)) {
//     return res.status(400).json({ error: "Id is invalid" });
//   }

//   // Find the index of the todo with the given ID
//   const todoIndex = todos.findIndex((todo) => todo.id === id);

//   // If the todo is not found, return a 404 error
//   if (todoIndex === -1) {
//     return res.status(404).json({ error: "Todo not found" });
//   }

//   // Update the todo at the found index with the new values
//   if (title !== undefined) todos[todoIndex].title = title;
//   if (completed !== undefined) todos[todoIndex].completed = completed;
//   if (description !== undefined) todos[todoIndex].description = description;

//   // Return the updated todo
//   res.status(200).json(todos[todoIndex]);
// });

// Delete Using `find`
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Find the todo before filtering to check if it exists
  const todo = todos.find((todo) => todo.id === id);

  // If the todo is not found, return a 404 error
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  // Filter out the todo with the matching ID
  todos = todos.filter((todo) => todo.id !== id);

  // Respond with a 204 No Content status code
  res.status(204).send();
});

// Delete Using `filter`
// app.delete("/todos/:id", (req, res) => {
//   const id = parseInt(req.params.id);

//   // Find the todo before filtering to check if it exists
//   const todo = todos.find((todo) => todo.id === id);

//   // If the todo is not found, return a 404 error
//   if (!todo) {
//     return res.status(404).json({ error: "Todo not found" });
//   }

//   // Filter out the todo with the matching ID
//   todos = todos.filter((todo) => todo.id !== id);

//   // Respond with a 204 No Content status code
//   res.status(204).send();
// });

// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
