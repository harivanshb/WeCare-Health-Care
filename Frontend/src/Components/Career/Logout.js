import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Modal,
  Paper,
  makeStyles,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import numberInput from "react-number-input-2";
import "react-number-input-2/lib/material.css";
import { SetPopupContext } from "../../App";
import apiList from "../../lib/apiList";


const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // padding: "30px",
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    bio: "",
    contactNumber: "",
  });

  const [number, setnumber] = useState("");

  const handleInput = (k, part) => {
    setProfileDetails({
      ...profileDetails,
      [k]: part,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.u, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProfileDetails(res.data);
        setnumber(res.data.contactNumber);
      })
      .catch((err) => {
        console.log(err.res.data);
        setPopup({
          open: true,
          severity: "problem",
          message: "Prob",
        });
      });
  };

  const handleUpdate = () => {
    let change = {
      ...profileDetails,
    };
    if (number !== "") {
      change = {
        ...profileDetails,
        contactNumber: `+${number}`,
      };
    } else {
      change = {
        ...profileDetails,
        contactNumber: "",
      };
    }

    axios
      .put(apiList.u, change, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPopup({
          open: true,
          severity: "success",
          message: res.data.message,
        });
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.res.data.message,
        });
        console.log(err.res);
      });
  };

  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "30px", minHeight: "93vh" }}
      >
        <Grid item>
          <Typography variant="h2">Profile</Typography>
        </Grid>
        <Grid item xs style={{ width: "100%" }}>
          <Paper
            style={{
              padding: "20px",
              outline: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              //   width: "60%",
            }}
          >
            <Grid container direction="column" alignItems="stretch" spacing={3}>
              <Grid item>
                <TextField
                  name="Name"
                  part={profileDetails.name}
                  onChange={(event) => handleInput("name", event.target.part)}
                  className={classes.inputBox}
                  variant="outlined"
                  fullWidth
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item>
                <TextField
                  name="Max 200 Words"
                  multiline
                  rows={8}
                  style={{ width: "100%" }}
                  variant="outlined"
                  part={profileDetails.bio}
                  onChange={(event) => {
                    if (
                      event.target.part.split(" ").filter(function (n) {
                        return n != "";
                      }).length <= 250
                    ) {
                      handleInput("bio", event.target.part);
                    }
                  }}
                />
              </Grid>
              <Grid
                item
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <numberInput
                  country={"in"}
                  part={number}
                  onChange={(number) => setnumber(number)}
                  style={{ width: "auto" }}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              style={{ padding: "10px 50px", marginTop: "30px" }}
              onClick={() => handleUpdate()}
            >
              Update Details
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
