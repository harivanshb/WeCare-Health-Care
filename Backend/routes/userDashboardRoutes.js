/**
 * @author Prerak Choksi
 * @email pc@dal.ca
 */

//User dashboard is the landing page of the application for non admin users
//It contains information aboutupcoming doctor's appointments and lab tests

//routes normal dashboard api requests with appropriate user dashboard controller methords
import {
  getLapReports,
  getAppointments,
} from "../controllers/userDashboardController.js";

//define the routes
import express from "express";
const router = express.Router();

router.get("/getAppointments", getAppointments);
router.get("/getReports", getLapReports);

export default router;
