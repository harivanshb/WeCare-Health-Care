//sanika ->sn820051@dal.ca
//Register page frontend, used form, userregister state and submit handler to submit the register form.
import React, { useState, useEffect } from "react";
import {Row, Col, Form} from "react-bootstrap";
import { register } from "../../Apiactions/userapis";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorMessage from "../../Components/ErrorMessage";

function RegisterScreen({ history }) {
  const [email, setEmail] = useState("");
  const [ispatient, setIspatient] = useState("true");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [er, setError] = useState(false);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(ispatient+"jooooo");
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else dispatch(register(name, email, ispatient, password));
  };

  return (
    <div class="container w-50 border border-primary mt-2 px-4 py-1">
      <h1
        style={{ fontSize: "36px", fontFamily: "Trebuchet MS", color: "black" }}
        class="d-flex justify-content-center text-primary m-1"
      >
        REGISTER
        <img
          style={{width: "40px", height: "40px", marginTop: "0px", marginLeft: "5px",}}
          src="/Capture1.PNG"
          alt="Italian Trulli"
        ></img>
      </h1>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        <form onSubmit={submitHandler}>
            <div class="form-group mt-1">
                <label for="exampleusername">Username</label>
                <input type="name" placeholder="Enter username" onChange={(e) => setName(e.target.value)} required class="form-control" id="exampleusername"/>
            </div>
            <div class="form-group mt-1">
                <label for="exampleInputEmail12">Email address</label>
                <input  type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required class="form-control" id="exampleInputEmail12"/>
            </div>
            <label className="d-block" for="ipatient">Are you a patient?</label>
                <Form.Control as="select" aria-label="" onChange={(e) => setIspatient(e.target.value)} >
                    <option key={"true"} value="true">Yes</option>
                    <option key={"false"} value="false">No</option>
                </Form.Control>

            <div className="form-group mt-1">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required class="form-control" id="exampleInputPassword1"/>
            </div>
            <div className="form-group mt-1">
                <label for="examplepassword">Confirm Password</label>
                <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required class="form-control" id="examplepassword"/>
            </div>
            <div className="d-flex justify-content-center">
                <button type="submit" required class="btn btn-primary mt-1 d-flex justify-content-center">Register</button>
            </div>
            </form>
            <Row className="py-0 text-center">
              <Col>
                Have an Account ? <Link to="/login">Login</Link>
              </Col>
            </Row>
     </div>
  );
}

export default RegisterScreen;
