import express from "express";

const router = express.Router();

const posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
];

// Get all posts
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
});

// Get single posts
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).json({ msg: `Post with id: ${id} not found` });
  }
  res.status(200).json(post);
});

// Create new post
router.post("/", (req, res) => {
  console.log(req.body);
  const newPost = { id: posts.length + 1, title: req.body.title };
  posts.push(newPost);
  res.status(201).json(posts);
});

export default router;
