/**
 * @author Prerak Choksi, Harivansh Bhatia
 * @email   pc@dal.ca, hr513288@dal.ca
 */

import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  specialInstruction: {
    type: String,
    required: false,
  },
  patientName: {
    type: String,
    required: true,
  },
  docSelected: {
    type: String,
    required: true,
  },
  selectedDate: {
    type: String,
    required: false,
  },
  selectedTime: {
    type: String,
    required: false,
  },
  dateTime: {
    type: String,
    required: false,
  },
});

const AppointmentSchemaModel = mongoose.model(
  "docappointments",
  appointmentSchema
);

export default AppointmentSchemaModel;
