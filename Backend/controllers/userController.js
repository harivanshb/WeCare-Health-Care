//sanika ->sn820051@dal.ca
import token from "../utils/generatetoken.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

//Controller for users that will have the functions to authenticate,register and update profile

//authenticate function
const Userauthentication = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      ispatient: user.ispatient,
      isAdmin: user.isAdmin,
      token: token(user._id),
    });
  } else {
    res.status(401);
    throw new Error("please enter valid mail and password");
  }
});

//registration function
const Userregistration = asyncHandler(async (req, res) => {
  const { name, email, ispatient, password } = req.body;
  console.log(req.body);
  const userexists = await User.findOne({ email });
  if (userexists) {
    res.status(404);
    throw new Error("User already present in database");
  }

  const user = await User.create({
    name,
    email,
    ispatient,
    password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      ispatient: user.ispatient,
      isAdmin: user.isAdmin,
      token: token(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//update profile function
const userProfileupdate = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const userupdate = await user.save();
    res.json({
      _id: userupdate._id,
      name: userupdate.name,
      email: userupdate.email,
      ispatient: userupdate.ispatient,
      isAdmin: userupdate.isAdmin,
      token: token(userupdate._id),
    });
  } else {
    res.status(404);
    throw new Error("no user found");
  }
});

const doctorName = async (req, res) => {
  const names = await User.find({ ispatient: false }, "name ");
  return res.json(names);
};

export { Userauthentication, userProfileupdate, Userregistration, doctorName };
