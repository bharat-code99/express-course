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
  const { title } = req.body ?? {};

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      message: "Please provide a valid title.",
    });
  }

  const newPost = {
    id: posts.length + 1,
    title: title.trim(),
  };

  posts.push(newPost);

  return res.status(201).json(newPost);
});

// Update Post
router.patch("/:id", (req, res) => {
  // 1. Validate ID
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID. Please provide a valid positive integer ID",
    });
  }

  // 2. Find the post
  const currPost = posts.find((post) => post.id === id);

  if (!currPost) {
    return res.status(404).json({
      success: false,
      message: `Post with ID ${id} not found`,
    });
  }

  // 3. Validate request body
  const { title } = req.body ?? {};

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Title is required and must be a non-empty string",
    });
  }

  // 4. Update post
  currPost.title = title.trim();

  // 5. Return updated post
  return res.status(200).json({
    success: true,
    message: "Post updated successfully",
    data: currPost,
  });
});

export default router;
