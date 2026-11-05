const posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
];

// @desc   Get All Posts
// @route  GET /api/posts
export const getPosts = (req, res, next) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
};

// @desc   Get Single Post
// @route  GET /api/posts/:id
export const getPost = (req, res, next) => {
  const id = req.postId;
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`Post with id: ${id} not found`);
    error.status = 404;
    return next(error);
    // return res.status(404).json({ msg: `Post with id: ${id} not found` });
  }
  res.status(200).json(post);
};

// @desc   Add new post
// @route  POST /api/posts
export const addPost = (req, res, next) => {
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
};

// @desc   Update post
// @route  PUT /api/posts/:id
export const updatePost = (req, res, next) => {
  // 1. Validate ID
  const id = req.postId;

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
};

// @desc   Delete Post
// @route  DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
  const id = req.postId;

  const idx = posts.findIndex((post) => post.id === id);

  if (idx === -1) {
    return res.status(404).json({
      success: false,
      message: `Post with id: ${id} not found`,
    });
  }

  posts.splice(idx, 1);

  return res.status(200).json({
    success: true,
    message: `Post with id ${id} deleted successfully`,
  });
};

// const postController = { getPosts, getPost, addPost, updatePost, deletePost };

// export default postController;
