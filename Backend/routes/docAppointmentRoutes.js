/**
 * @author Harivansh Bhatia
 * @email hr513288@dal.ca
 */

import express from "express";
import {
  bookAppointment,
  getBookedAppointment,
  deleteAppointment,
  updateAppointment,
} from "../controllers/docAppointmentController.js";

const router = express.Router();
router.get("/:email", getBookedAppointment);
router.post("/booking", bookAppointment);
router.delete("/:id", deleteAppointment);
router.put("/:id", updateAppointment);

export default router;
