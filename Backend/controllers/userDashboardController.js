/**
 * @author Prerak Choksi
 * @email pc@dal.ca
 */

import AppointmentSchemaModel from "../models/appointmentBookingModel.js";
import PModel from "../models/pathalogyModel.js";
//getting appointments according to email
const getAppointments = async (req, res) => {
  res.json(await AppointmentSchemaModel.find({ email: req.query.email }));
};
//getting reports according to email
const getLapReports = async (req, res) => {
  res.json(await PModel.find({ patientEmail: req.query.email }));
};
export { getAppointments, getLapReports };
