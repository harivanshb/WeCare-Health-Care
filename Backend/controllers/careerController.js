/**
 * This file is controlling the status of the application.
 * The status could be updated within the application and it would be reflected to the both ends.
 * There are multiple constraints which are limitations like the dates and teh SOP word limit of 250
 * Used multiple online places to learn this.
 * URL: https://www.the-art-of-web.com/javascript/validate-date/
 * URL: https://support.microsoft.com/en-us/office/restrict-data-input-by-using-validation-rules-b91c6b15-bcd3-42c1-90bf-e3a0272e988d
 * URL: https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
 */

const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "applied", 
        "shortlisted", 
        "accepted", 
        "rejected", 
        "deleted", 
        "cancelled", 
      ],
      default: "applied",
      required: true,
    },
    dateOfApplication: {
      type: Date,
      default: Date.now,
    },
    dateOfJoining: {
      type: Date,
      validate: [
        {
          validator: function (value) {
            return this.dateOfApplication <= value;
          },
          msg: "Invalid Dates",
        },
      ],
    },
    sop: {
      type: String,
      validate: {
        validator: function (v) {
          return v.split(" ").filter((ele) => ele != "").length <= 250;
        },
        msg: "SOP more than limited words ",
      },
    },
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("applications", schema);
