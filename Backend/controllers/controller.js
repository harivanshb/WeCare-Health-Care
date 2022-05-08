const config = require("../config/config.js");

const testGet = (req, res) => {
  console.log("Testing the get request");
  try {
    console.log("Inside try block");
    return res.status(200).json({ message: "Test Successful", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const controller = { testGet };
module.exports = controller;
