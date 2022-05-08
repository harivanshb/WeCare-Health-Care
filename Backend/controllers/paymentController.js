/**
 * @author Farhin Damania
 * @email fr454807@dal.ca
 */
import PaymentModel from "../models/paymentModel.js";

const addPaymentForm = async (req, res) => {
    var p = {};
    p.patientName = req.body.patientName;
    p.patientEmail = req.body.patientEmail;
    p.fname=req.body.fname;
    p.lname=req.body.lname;
    p.payerEmail=req.body.payerEmail;
    p.payerAddress=req.body.payerAddress;
    p.Amount=req.body.Amount;
    PaymentModel.create(p, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  };

  export {addPaymentForm};