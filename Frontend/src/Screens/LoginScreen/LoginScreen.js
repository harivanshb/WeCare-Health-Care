//sanika ->sn820051@dal.ca
//Login page frontend, used form, login state and submit handler to submit the login form. 
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../Components/ErrorMessage";
import Loading from "../../Components/Loading";
import { login } from "../../Apiactions/userapis";

function LoginScreen({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    console.log(userInfo, 99);

    if (!!userInfo) {
      if (userInfo.isAdmin) {
        history.push("/AdminDashboard");
      }
      if (!userInfo.isAdmin) {
        history.push("/NormalDashboard");
      }
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div class="container w-50 border border-primary mt-3 p-3 mb-5">
      <h1
        style={{ fontSize: "42px", fontFamily: "Trebuchet MS", color: "black" }}
        class="d-flex justify-content-center text-primary m-3"
      >
        LOGIN
        <img style={{ width: "40px", height: "40px", marginTop: "0px", marginLeft: "5px",}}src="/Capture1.PNG"alt="Italian Trulli"></img>
      </h1>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <form onSubmit={submitHandler}>
        <div class="form-group mt-4 my-2">
          <label for="exampleusername">Email address</label>
          <input value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required class="form-control" id="exampleusername" aria-describedby="emailHelp"/>
        </div>
        <div class="form-group mt-4 my-2">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} required class="form-control" id="exampleInputPassword1"
          />
        </div>
        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary m-3 d-flex justify-content-center">Login</button>
        </div>
      </form>
      <div className="row text-center mt-1">
        <div className="col">
          New to WeCare ? <Link to="/register">Register Here</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
