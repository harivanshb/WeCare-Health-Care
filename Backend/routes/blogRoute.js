
/**
 * @author Vishal Rakesh Jaiswal
 * @email vs928999@dal.ca
 */
import express from "express";
import {
  addBlog,
  fetchBlog
} from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/add_blog").post(protect, addBlog);
router.route("/fetch_blog").get(fetchBlog);

export default router;
 