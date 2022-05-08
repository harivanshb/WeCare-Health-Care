import mongoose from "mongoose";
/**
 * @author Prerak Choksi
 * @email   pc@dal.ca
 */

const vaccineSchema = mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  count: {
    type: String,
    required: true,
  },
});
const VaccineModel = mongoose.model("vaccine_records", vaccineSchema);

export default VaccineModel;
