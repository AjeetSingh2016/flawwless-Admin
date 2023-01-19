const express = require("express");
const router = express.Router();
const {
  createPost,
  fetchPosts,
  fetchPost,
  updatePost,
  updateValidations,
  deletePost,
  home
} = require("../controllers/postController");
const auth = require("../utils/auth");

router.post("/create_post", auth, createPost);
router.get("/posts/:id", auth, fetchPosts);
router.get("/post/:id", auth, fetchPost);
router.post("/update", [auth, updateValidations], updatePost);
router.get("/delete/:id", auth, deletePost);
router.get("/home_post", home);

module.exports = router;
