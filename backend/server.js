const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// GET all projects
app.get("/projects", (req, res) => {
  db.query("SELECT * FROM projects", (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error fetching projects");
    }
    res.json(result);
  });
});

// ADD new project
app.post("/projects", (req, res) => {
  const { title, description, tech_stack, github_link, live_link } = req.body;

  const sql = `
    INSERT INTO projects (title, description, tech_stack, github_link, live_link)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, description, tech_stack, github_link, live_link],
    (err) => {
      if (err) {
        console.log(err);
        return res.send("Error adding project");
      }
      res.send("Project added successfully ✅");
    }
  );
});

// DELETE project
app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM projects WHERE id = ?", [id], (err) => {
    if (err) {
      console.log(err);
      return res.send("Error deleting project");
    }
    res.send("Project deleted ✅");
  });
});

// START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
// UPDATE project
app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, tech_stack, github_link, live_link } = req.body;

  const sql = `
    UPDATE projects 
    SET title = ?, description = ?, tech_stack = ?, github_link = ?, live_link = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [title, description, tech_stack, github_link, live_link, id],
    (err) => {
      if (err) {
        console.log(err);
        return res.send("Error updating project");
      }
      res.send("Project updated ✅");
    }
  );
});