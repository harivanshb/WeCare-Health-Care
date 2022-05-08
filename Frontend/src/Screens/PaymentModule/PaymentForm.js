/**
 * @author Farhin Damania
 * @email fr454807@dal.ca
 */

import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
// import image from "../images/image.jpg"
import { Icon } from "@iconify/react";
import { Grid, Paper, Button } from "@material-ui/core";

import { useSelector } from "react-redux";

function Paymentform({ history }) {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [payerEmail, setpayerEmail] = useState("");
  const [payerAddress, setpayerAddress] = useState("");
  const [Amount, setAmount] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const usestripe = useStripe();
  const uselements = useElements();
  const newpaperstyle = {
    margin: "30px auto",
    width: 1200,
    padding: "20px 20px",
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const { error, payment } = await usestripe.createPaymentMethod({
      type: "card",
      card: uselements.getElement(CardElement),
    });
    //checking for alerts
    if (fname === "") {
      alert("Enter First Name");
    } else if (lname === "") {
      alert("Enter Last Name");
    } else if (payerEmail === "") {
      alert("Enter Payer's Email");
    } else if (payerAddress === "") {
      alert("Enter Payer's Address");
    } else if (Amount === "") {
      alert("Enter Amount");
    } else {
      //api call for post
      axios
        .post(
          "/api/payment/addPaymentForm",

          {
            patientName: userInfo.name,
            patientEmail: userInfo.email,
            fname,
            lname,
            payerEmail,
            payerAddress,
            Amount,
          }
        )
        .then(function (res) {
          if (res.status === 200) {
            alert("Payment Successfully done");
            
          }
        });
    }
  };

  return (
    <>
      <Grid>
        <Paper elevation={15} style={newpaperstyle}>
          <form onSubmit={handlesubmit}>
            <div class="row">
              <div class="col-sm-4">
                <label for="pname" class="form-label">
                  Patient Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="pname"
                  pattern="^[a-zA-Z_ ]*$"
                  value={userInfo.name}
                  onChange={() => {}}
                  id="pname"
                  placeholder="Sarah Geller"
                  required
                />
              </div>

              <div class="col-sm-4">
                <label for="pemail" class="form-label">
                  Patient Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="pid"
                  id="pid"
                  value={userInfo.email}
                  onChange={() => {}}
                  pattern="^[a-zA-Z0-9]*$"
                  placeholder="abc@gmail.com"
                  required
                />
              </div>

              <div class="col-sm-4">
                <br />
                <h4>
                  <i>We have simplified the payment process for you!</i>
                </h4>
              </div>
            </div>

            <br />
            <div class="row">
              <div class="col-sm-4">
                <label for="fname" class="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  pattern="^[a-zA-Z]*$"
                  className="form-control"
                  name="fname"
                  id="fname"
                  value={fname}
                  onChange={(e) => setfname(e.target.value)}
                  placeholder="Farhin"
                  required
                />
              </div>

              <div class="col-sm-4">
                <label for="lname" class="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lname"
                  value={lname}
                  onChange={(e) => setlname(e.target.value)}
                  id="lname"
                  pattern="^[a-zA-Z]*$"
                  placeholder="Damania"
                  required
                />
              </div>
              <div class="col-sm-4">
                <br />
                <h5>
                  <i>*Pay from anywhere and anytime</i>
                </h5>
              </div>
            </div>

            <br />
            <div class="row">
              <div class="col-sm-4">
                <label for="email" class="form-label">
                  Payer Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={payerEmail}
                  onChange={(e) => setpayerEmail(e.target.value)}
                  name="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  id="email"
                  placeholder="farhindamania@gmail.com"
                  required
                />
              </div>

              <div class="col-sm-4">
                <label for="addr" class="form-label">
                  Payer Billing Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="addr"
                  id="addr"
                  value={payerAddress}
                  onChange={(e) => setpayerAddress(e.target.value)}
                  pattern="^[a-zA-Z0-9\s,'-]*$"
                  placeholder="Apt 000, 1991 Brunswick St "
                  required
                />
              </div>
              <div class="col-sm-4">
                <br />
                <h5>
                  <i>*Pay for your loved ones today</i>
                </h5>
              </div>
            </div>

            <br />
            <div class="row">
              <div class="col-sm-8">
                <label for="amount" class="form-label">
                  Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="amount"
                  value={Amount}
                  onChange={(e) => setAmount(e.target.value)}
                  pattern="[0-9]+"
                  id="amount"
                  placeholder="Please enter the amount to be paid here in CAD"
                  required
                />
              </div>
              <div class="col-sm-4">
                <br />
                <h5>
                  <i>*Secure payment gateway</i>
                </h5>
              </div>
            </div>

            <br />
            <div class="row">
              <div class="col-sm-8">
                <label for="card" class="form-label">
                  Card Number -- Expiration Date -- CVC
                </label>
                <CardElement
                  className="p-2 border border-dark"
                  name="card"
                  id="card"
                />
              </div>
              <div class="col-sm-4">
                <br />
                <Icon icon="logos:mastercard" style={{ fontSize: "50px" }} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Icon icon="logos:visa" style={{ fontSize: "40px" }} />
              </div>
            </div>

            <br />
            <Button
              variant="contained"
              style={{ backgroundColor: "#1465e1", color: "white" }}
              onClick={handlesubmit}
            >
              Pay Now
            </Button>
          </form>
        </Paper>
      </Grid>

    </>
  );
}

export default Paymentform;
