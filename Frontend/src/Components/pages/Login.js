import React, { useState } from "react";
import { login } from "../../Store/store";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (

  <div class="container w-50 border border-primary mt-3 p-3">
    <h1 style={{ fontSize: "42px", fontFamily: "Trebuchet MS", color:"black"}} class="d-flex justify-content-center text-primary m-3">LOGIN<img style={{width:"40px", height:"40px", marginTop:"0px", marginLeft:"5px"}} src="/Capture1.PNG" alt="Italian Trulli"></img></h1>
    <form  onSubmit={submitHandler}>
        <div class="form-group mt-4 my-2">
            <label for="exampleusername">Email address</label>
            <input  value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required class="form-control" id="exampleusername" aria-describedby="emailHelp"/>
        </div>
        <div class="form-group mt-4 my-2">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} required class="form-control" id="exampleInputPassword1" />
        </div>
        <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary m-3 d-flex justify-content-center">Login</button>
        </div>
        </form>
  </div>
  );
}

export default Login;
