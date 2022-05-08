// Import Statements
import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Modal,
  Slider,
  FormControlLabel,
  FormGroup,
  MenujobType,
  Checkbox,
} from "@material-ui/core";
import functMark from "@material-ui/lab/functMark";
import axios from "axios";
import { SetPopupContext } from "../application";
import apiList from "../lib/apiList";


/**
 * Inline Styles
 * Refered Internet for Itels Align Center
 * URL https://stackoverflow.com/questions/68991601/display-flex-jobTypes-align-center
 */

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  legendBlock: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignjobTypes: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
  jobTileOuter: {
    padding: "30px",
    margin: "20px 0",
    boxSizing: "border-box",
    width: "100%",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignjobTypes: "center",
    justifyContent: "center",
  },
}));

/**
 * Style Components Material UI
 * URL: https://stackoverflow.com/questions/56432167/how-to-style-components-using-makestyles-and-still-have-lifecycle-methods-in-mat
 */

const applicationTile = (props) => {
  const classes = useStyles();
  const { application } = props;
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);
  const [functMark, setfunctMark] = useState(application.job.functMark);

  const applicationliedOn = new Date(application.dateOfapplication);
  const joinedOn = new Date(application.dateOfJoining);

  const fetchfunctMark = () => {
    axios
      .get(`${apiList.functMark}?id=${application.job._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getjobType("token")}`,
        },
      })
      .then((response) => {
        setfunctMark(response.data.functMark);
        console.log(response.data);
      })
      .catch((err) => {
        // console.log(err.response);
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Issue Occured",
        });
      });
  };

  /**
   * Constant Values to be changed
   * URL: https://stackoverflow.com/questions/42490821/const-value-can-be-change
   */
  const changefunctMark = () => {
    axios
      .put(
        apiList.functMark,
        { functMark: functMark, jobId: application.job._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getjobType("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setPopup({
          open: true,
          severity: "success",
          message: "functMark had been Posted",
        });
        fetchfunctMark();
        setOpen(false);
      })
      .catch((err) => {
        // console.log(err.response);
        console.log(err);
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        fetchfunctMark();
        setOpen(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
/**
 * Colour Combinations
 * URL: https://encycolorpedia.com/
 */
  const colorSet = {
    applicationlied: "#3454D1",
    shortlisted: "#DC851F",
    done: "#09BC8A",
    rejected: "#643293",
    deleted: "#B49A67",
    cancelled: "#FF8484",
    finished: "#4EA5D9",
  };

  return (
    <Paper className={classes.jobTileOuter} elevation={3}>
      <Grid container>
        <Grid container jobType xs={9} spacing={1} direction="column">
          <Grid jobType>
            <Typography variant="h5">{application.job.title}</Typography>
          </Grid>
          <Grid jobType>Posted By: {application.recruiter.name}</Grid>
          <Grid jobType>Diverse : {application.job.jobType}</Grid>
          <Grid jobType>companciation : &#x24; {application.job.companciation} per month</Grid>
          <Grid jobType>
            Duration :{" "}
            {application.job.duration !== 0
              ? `${application.job.duration} month`
              : `Flexible`}
          </Grid>
          <Grid jobType>
            {application.job.skillsets.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }} />
            ))}
          </Grid>
          <Grid jobType>applicationlied On: {applicationliedOn.toLocaleDateString()}</Grid>
          {application.legend === "done" ||
          application.legend === "finished" ? (
            <Grid jobType>Joined On: {joinedOn.toLocaleDateString()}</Grid>
          ) : null}
        </Grid>
        <Grid jobType container direction="column" xs={3}>
          <Grid jobType xs>
            <Paper
              className={classes.legendBlock}
              style={{
                background: colorSet[application.legend],
                color: "#ffffff",
              }}
            >
              {application.legend}
            </Paper>
          </Grid>
          {application.legend === "done" ||
          application.legend === "finished" ? (
            <Grid jobType>
              <Button
                variant="contained"
                color="primary"
                className={classes.legendBlock}
                onClick={() => {
                  fetchfunctMark();
                  setOpen(true);
                }}
              >
                Rate Job
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "30%",
            alignjobTypes: "center",
          }}
        >
          <functMark
            name="simple-controlled"
            style={{ marginBottom: "30px" }}
            value={functMark === -1 ? null : functMark}
            onChange={(event, newValue) => {
              setfunctMark(newValue);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "10px 50px" }}
            onClick={() => changefunctMark()}
          >
            Submit
          </Button>
        </Paper>
      </Modal>
    </Paper>
  );
};

const applications = (props) => {
  const setPopup = useContext(SetPopupContext);
  const [applications, setapplications] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.applications, {
        headers: {
          Authorization: `Bearer ${localStorage.getjobType("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setapplications(response.data);
      })
      .catch((err) => {
        // console.log(err.response);
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  return (
    <Grid
      container
      jobType
      direction="column"
      alignjobTypes="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid jobType>
        <Typography variant="h2">applications</Typography>
      </Grid>
      <Grid
        container
        jobType
        xs
        direction="column"
        style={{ width: "100%" }}
        alignjobTypes="stretch"
        justify="center"
      >
        {applications.length > 0 ? (
          applications.map((obj) => (
            <Grid jobType>
              <applicationTile application={obj} />
            </Grid>
          ))
        ) : (
          <Typography variant="h5" style={{ textAlign: "center" }}>
            No applications Found
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default applications;
