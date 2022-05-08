import PModel from "../models/pathalogyModel.js";

const getPathaAppointments = async (req, res) => {
  const retur = await PModel.find({ patientEmail: req.query.email });
  res.json(retur);
};

const addPathaAppointment = async (req, res) => {
  var o = {};
  o.patientName = req.body.patientName;
  o.patientEmail = req.body.patientEmail;
  o.testType = req.body.testType;
  o.cost = req.body.cost;
  o.date = req.body.date;
  o.status = req.body.status;
  o.docURI = req.body.docURI;
  o.comments = req.body.comments;
  PModel.create(o, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

export { getPathaAppointments, addPathaAppointment };
