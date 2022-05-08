import mongoose from "mongoose";
/**
 * @author Prerak Choksi, Vishal Jaiswal
 * @email   pc@dal.ca, vs928999@dal.ca
 */

const empSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  emptype: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },

  phonenumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },

  salary: {
    type: Number,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },
});
const EmployeeModel = mongoose.model("employee_datas", empSchema);

export default EmployeeModel;
