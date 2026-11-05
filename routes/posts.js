import express from "express";
import validateId from "../middleware/validateId.js";
import { getPosts, getPost, addPost, updatePost, deletePost } from "../controllers/postsController.js";

const router = express.Router();

// Get all posts
router.get("/", getPosts);

// Get single post
router.get("/:id", validateId, getPost);

// Create new post
router.post("/", addPost);

// Update Post
router.put("/:id", validateId, updatePost);

// Delete Post
router.delete("/:id", validateId, deletePost);

export default router;
