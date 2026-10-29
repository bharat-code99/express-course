import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
];

const app = express();

app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "home.html"));
// });

// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });

// Get all posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// Get single posts
app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  res.json(post);
});

app.get("/api/", (req, res) => {
  res.send({ message: "Home Page" });
});

app.get("/api/about", (req, res) => {
  res.send({ message: "About Page" });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
