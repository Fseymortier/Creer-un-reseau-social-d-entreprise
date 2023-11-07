const router = require("express").Router();
const { authJwt } = require("../middleware");
const multer = require("../middleware/multer-config");
const post = require("../controllers/post.controller.js");

router.post("/", [authJwt.verifyToken], multer, post.create); // create post
router.get("/", [authJwt.verifyToken], post.findAll); // find all posts
router.get("/:id", [authJwt.verifyToken], post.findOne); // find post by id
router.put("/:id", [authJwt.verifyToken], multer, post.update); // update post by id
router.delete("/:id", [authJwt.verifyToken], post.delete); // delete post by id

module.exports = router;
