/**
 * @author Prerak Choksi
 * @email pc@dal.ca
 */

//routes admin dashboard api requests with appropriate admin dashboard controller methords
import express from "express";
import {
  getEmployeeByGender,
  getEmployeeByDepartment,
  getVaccineDetails,
  getEmployeeByWorkingStatus,
} from "../controllers/dashboardController.js";
//define the routes
const router = express.Router();
router.get("/getEmployeeByDepartment", getEmployeeByDepartment);
router.get("/getEmployeeByGender", getEmployeeByGender);

router.get("/getVaccineDetails", getVaccineDetails);
router.get("/getEmployeeByWorkingStatus", getEmployeeByWorkingStatus);

export default router;
