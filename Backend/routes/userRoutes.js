//sanika ->sn820051@dal.ca
//this will define routes used in user secrion, / refers to the landing page
///login means that what application will render to login page when we will go to localhost/login
//similarly and /profile is used for rendering profile
import express from "express";
import {
  Userauthentication,
  Userregistration,
  userProfileupdate,
  doctorName,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").post(Userregistration);
router.post("/login", Userauthentication);
router.route("/profile").post(protect, userProfileupdate);
router.get("/doctorNames", doctorName);

export default router;
