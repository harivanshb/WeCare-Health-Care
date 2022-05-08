import express from "express";
import {
  getPathaAppointments,
  addPathaAppointment,
} from "../controllers/pathologyController.js";
const router = express.Router();

router.get("/getPathaAppointment", getPathaAppointments);
router.post("/addPathaAppointment", addPathaAppointment);

export default router;
