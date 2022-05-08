import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Modal,
  Paper,
  makeStyles,
  TextField,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import { SetPopupContext } from "../../App";
import apiList from "../../lib/apiList";




const style = makeStyles((theme) => ({
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

const jobs = (props) => {
  const classes = style();
  const setPopup = useContext(SetPopupContext);

  const [info, setinfo] = useState({
    title: "",
    max: 100,
    maxp: 30,
    terminate: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 16),
    skillsets: [],
    jobType: "Full Time",
    duration: 0,
    compansiation: 0,
  });

  const handleInput = (key, amount) => {
    setinfo({
      ...info,
      [key]: amount,
    });
  };

  const handleUpdate = () => {
    console.log(info);
    axios
      .post(apiList.jobs, info, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((respond) => {
        setPopup({
          open: true,
          severity: "pass",
          message: respond.info.message,
        });
        setinfo({
          title: "",
          max: 100,
          maxp: 30,
          terminate: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
          skillsets: [],
          jobType: "Full Time",
          duration: 0,
          compansiation: 0,
        });
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "issue",
          message: err.respond.info.message,
        });
        console.log(err.respond);
      });
  };

  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "30px", minHeight: "93vh", width: "" }}
      >
        <Grid item>
          <Typography variant="h2">Add Information</Typography>
        </Grid>
        <Grid item container xs direction="column" justify="center">
          <Grid item>
            <Paper
              style={{
                padding: "20px",
                outline: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid
                container
                direction="column"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item>
                  <TextField
                    label="Title"
                    amount={info.title}
                    onChange={(event) =>
                      handleInput("title", event.target.amount)
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <ChipInput
                    className={classes.inputBox}
                    label="Skills"
                    variant="outlined"
                    helperText="Press enter to add skills"
                    amount={info.skillsets}
                    onAdd={(chip) =>
                      setinfo({
                        ...info,
                        skillsets: [...info.skillsets, chip],
                      })
                    }
                    onDelete={(chip, index) => {
                      let skillsets = info.skillsets;
                      skillsets.splice(index, 1);
                      setinfo({
                        ...info,
                        skillsets: skillsets,
                      });
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    select
                    label="Job Type"
                    variant="outlined"
                    amount={info.jobType}
                    onChange={(event) => {
                      handleInput("jobType", event.target.amount);
                    }}
                    fullWidth
                  >
                    <MenuItem amount="Full Time">Full Time</MenuItem>
                    <MenuItem amount="Part Time">Part Time</MenuItem>
                    <MenuItem amount="Work From Home">Work From Home</MenuItem>
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField
                    select
                    label="Duration"
                    variant="outlined"
                    amount={info.duration}
                    onChange={(event) => {
                      handleInput("duration", event.target.amount);
                    }}
                    fullWidth
                  >
                    <MenuItem amount={0}>Flexible</MenuItem>
                    <MenuItem amount={1}>1 Month</MenuItem>
                    <MenuItem amount={2}>2 Months</MenuItem>
                    <MenuItem amount={3}>3 Months</MenuItem>
                    <MenuItem amount={4}>4 Months</MenuItem>
                    <MenuItem amount={5}>5 Months</MenuItem>
                    <MenuItem amount={6}>6 Months</MenuItem>
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField
                    label="compansiation"
                    type="number"
                    variant="outlined"
                    amount={info.compansiation}
                    onChange={(event) => {
                      handleInput("compansiation", event.target.amount);
                    }}
                    InputProps={{ inputProps: { min: 0 } }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Application terminate"
                    type="datetime-local"
                    amount={info.terminate}
                    onChange={(event) => {
                      handleInput("terminate", event.target.amount);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Maximum Number Of Applicants"
                    type="number"
                    variant="outlined"
                    amount={info.max}
                    onChange={(event) => {
                      handleInput("max", event.target.amount);
                    }}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Positions Available"
                    type="number"
                    variant="outlined"
                    amount={info.maxp}
                    onChange={(event) => {
                      handleInput("maxp", event.target.amount);
                    }}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px", marginTop: "30px" }}
                onClick={() => handleUpdate()}
              >
                Create Job
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default jobs;
