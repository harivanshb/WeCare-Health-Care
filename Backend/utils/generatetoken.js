//sanika ->sn820051@dal.ca
import jwt from "jsonwebtoken";

const token = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};

export default token;