import mongoose from "mongoose";

const labReportSchema = mongoose.Schema({
  patientName: {
    type: String,
  },
  patientEmail: {
    type: String,
  },
  testType: {
    type: String,
  },
  cost: {
    type: String,
  },
  date: {
    type: String,
  },
  status: {
    type: String,
  },

  docURI: {
    type: String,
  },
  comments: {
    type: String,
  },
});
const LabReportModel = mongoose.model("path_datas", labReportSchema);

export default LabReportModel;
