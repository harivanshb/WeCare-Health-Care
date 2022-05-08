/**
 * @author Farhin Damania
 * @email  fr454807@dal.ca
 */

 import mongoose from "mongoose";

 const paymentSchema = mongoose.Schema({
   patientName: {
     type: String,
   },
   patientEmail: {
     type: String,
   },
   fname: {
     type: String,
   },
   lname: {
     type: String,
   },
   payerEmail: {
     type: String,
   },
   payerAddress: {
     type: String,
   },
 
   Amount: {
     type: String,
   },
 
 });
 const PaymentModel = mongoose.model("payment_data", paymentSchema);
 
 export default PaymentModel;
 