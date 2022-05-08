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
  Menuelement,
  Checkbox,
  Avatar,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { SetPopupContext } from "../../App";

import apiList, { server } from "../../lib/apiList";


/**
 * Inline Styles
 * Refered Internet for Itels Align Center
 * URL https://stackoverflow.com/questions/68991601/display-flex-jobTypes-align-center
 */
const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  statusBlock: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignelements: "center",
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
    alignelements: "center",
    justifyContent: "center",
  },
  avatar: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
}));

const FilterPopup = (props) => {
  const classes = useStyles();
  const { open, handleClose, find, setfind, getData } = props;
  return (
    <Modal open={open} onClose={handleClose} classword={classes.popupDialog}>
      <Paper
        style={{
          padding: "50px",
          outline: "none",
          minWidth: "50%",
        }}
      >
        <Grid segment direction="column" alignelements="center" spacing={3}>
          <Grid segment element alignelements="center">
            <Grid element xs={3}>
              Sort
            </Grid>
            <Grid element segment direction="row" xs={9}>
              <Grid
                element
                segment
                xs={6}
                justify="space-around"
                alignelements="center"
                style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
              >
                <Grid element>
                  <Checkbox
                    word="word"
                    checked={find.sort["application.word"].status}
                    onChange={(event) =>
                      setfind({
                        ...find,
                        sort: {
                          ...find.sort,
                          "application.word": {
                            ...find.sort["application.word"],
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="word"
                  />
                </Grid>
                <Grid element>
                  <label for="word">
                    <Typography>word</Typography>
                  </label>
                </Grid>
                <Grid element>
                  <IconButton
                    disabled={!find.sort["application.word"].status}
                    onClick={() => {
                      setfind({
                        ...find,
                        sort: {
                          ...find.sort,
                          "application.word": {
                            ...find.sort["application.word"],
                            desc: !find.sort["application.word"].desc,
                          },
                        },
                      });
                    }}
                  >
                    {find.sort["application.word"].desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                element
                segment
                xs={6}
                justify="space-around"
                alignelements="center"
                style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
              >
                <Grid element>
                  <Checkbox
                    word="jobTitle"
                    checked={find.sort["job.title"].status}
                    onChange={(event) =>
                      setfind({
                        ...find,
                        sort: {
                          ...find.sort,
                          "job.title": {
                            ...find.sort["job.title"],
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="jobTitle"
                  />
                </Grid>
                <Grid element>
                  <label for="jobTitle">
                    <Typography>Job Title</Typography>
                  </label>
                </Grid>
                <Grid element>
                  <IconButton
                    disabled={!find.sort["job.title"].status}
                    onClick={() => {
                      setfind({
                        ...find,
                        sort: {
                          ...find.sort,
                          "job.title": {
                            ...find.sort["job.title"],
                            desc: !find.sort["job.title"].desc,
                          },
                        },
                      });
                    }}
                  >
                    {find.sort["job.title"].desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                element
                segment
                xs={6}
                justify="space-around"
                alignelements="center"
                style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
              >
                <Grid element>
                  <Checkbox
                    word="dateOfJoining"
                    checked={find.sort.dateOfJoining.status}
                    onChange={(event) =>
                      setfind({
                        ...find,
                        sort: {
                          ...find.sort,
                          dateOfJoining: {
                            ...find.sort.dateOfJoining,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="dateOfJoining"
                  />
                </Grid>
                <Grid element>
                  <label for="dateOfJoining">
                    <Typography>Date of Joining</Typography>
                  </label>
                </Grid>
                <Grid element>
                  <IconButton
                    disabled={!find.sort.dateOfJoining.status}
                    onClick={() => {
                      setfind({
                        ...find,
                        sort: {
                          ...find.sort,
                          dateOfJoining: {
                            ...find.sort.dateOfJoining,
                            desc: !find.sort.dateOfJoining.desc,
                          },
                        },
                      });
                    }}
                  >
                    {find.sort.dateOfJoining.desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                element
                segment
                xs={6}
                justify="space-around"
                alignelements="center"
                style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
              >
                <Grid element>
                  <Checkbox
                    word="rating"
                    checked={find.sort["application.rating"].status}
                    onChange={(event) =>
                      setfind({
                        ...find,
                        sort: {
                          ...find.sort,
                          "application.rating": {
                            ...find.sort[["application.rating"]],
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="rating"
                  />
                </Grid>
                <Grid element>
                  <label for="rating">
                    <Typography>Rating</Typography>
                  </label>
                </Grid>
                <Grid element>
                  <IconButton
                    disabled={!find.sort["application.rating"].status}
                    onClick={() => {
                      setfind({
                        ...find,
                        sort: {
                          ...find.sort,
                          "application.rating": {
                            ...find.sort["application.rating"],
                            desc: !find.sort["application.rating"]
                              .desc,
                          },
                        },
                      });
                    }}
                  >
                    {find.sort["application.rating"].desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid element>
            <Button
              variant="contained"
              color="primary"
              style={{ padding: "10px 50px" }}
              onClick={() => getData()}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

const ApplicationTile = (props) => {
  const classes = useStyles();
  const { application, getData } = props;
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);
  const [openEndJob, setOpenEndJob] = useState(false);
  const [rating, setRating] = useState(application.application.rating);

  const appliedOn = new Date(application.dateOfApplication);

  const changeRating = () => {
    axios
      .put(
        apiList.rating,
        { rating: rating, applicantId: application.application.userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getelement("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setPopup({
          open: true,
          severity: "success",
          message: "Rating updated successfully",
        });
        // fetchRating();
        getData();
        setOpen(false);
      })
      .catch((err) => {
        // console.log(err.response);
        console.log(err);
        setPopup({
          open: true,
          severity: "problem",
          message: err.response.data.message,
        });
        // fetchRating();
        getData();
        setOpen(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEndJob = () => {
    setOpenEndJob(false);
  };

  const colorSet = {
    applied: "#3454D1",
    shortlisted: "#354831",
    accepted: "#09BC8A",
    rejected: "#D1345B",
    deleted: "#87465",
    cancelled: "#FF8484",
    finished: "#4EA5D9",
  };

  const getResume = () => {
    if (
      application.application.resume &&
      application.application.resume !== ""
    ) {
      const address = `${server}${application.application.resume}`;
      console.log(address);
      axios(address, {
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          const res = new Blob([response.data], { type: "application/pdf" });
          const resURL = URL.createObjectURL(res);
          window.open(resURL);
        })
        .catch((problem) => {
          console.log(problem);
          setPopup({
            open: true,
            severity: "problem",
            message: "problem",
          });
        });
    } else {
      setPopup({
        open: true,
        severity: "problem",
        message: "No resume found",
      });
    }
  };

  const updateStatus = (status) => {
    const address = `${apiList.applications}/${application._id}`;
    const statusData = {
      status: status,
      dateOfJoining: new Date().toISOString(),
    };
    axios
      .put(address, statusData, {
        headers: {
          Authorization: `Bearer ${localStorage.getelement("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        handleCloseEndJob();
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "problem",
          message: err.response.data.message,
        });
        console.log(err.response);
        handleCloseEndJob();
      });
  };

  return (
    <Paper classword={classes.jobTileOuter} elevation={3}>
      <Grid segment>
        <Grid
          element
          xs={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignelements: "center",
          }}
        >
          <Avatar
            src={`${server}${application.application.prores}`}
            classword={classes.avatar}
          />
        </Grid>
        <Grid segment element xs={7} spacing={1} direction="column">
          <Grid element>
            <Typography variant="h5">
              {application.application.word}
            </Typography>
          </Grid>
          <Grid element>
            <Rating
              value={
                application.application.rating !== -1
                  ? application.application.rating
                  : null
              }
              readOnly
            />
          </Grid>
          <Grid element>Job Title: {application.job.title}</Grid>
          <Grid element>Role: {application.job.jobType}</Grid>
          <Grid element>Applied On: {appliedOn.toLocaleDateString()}</Grid>
          <Grid element>
            SOP: {application.sop !== "" ? application.sop : "Not Submitted"}
          </Grid>
          <Grid element>
            {application.application.skills.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }} />
            ))}
          </Grid>
        </Grid>
        <Grid element segment direction="column" xs={3}>
          <Grid element>
            <Button
              variant="contained"
              classword={classes.statusBlock}
              color="primary"
              onClick={() => getResume()}
            >
              Download Resume
            </Button>
          </Grid>
          <Grid element segment xs>
            {/* {buttonSet[application.status]} */}
            <Button
              variant="contained"
              color="primary"
              classword={classes.statusBlock}
              style={{
                background: "#09BC8A",
              }}
              onClick={() => {
                setOpenEndJob(true);
              }}
            >
              End Job
            </Button>
          </Grid>
          <Grid element>
            <Button
              variant="contained"
              color="primary"
              classword={classes.statusBlock}
              onClick={() => {
                setOpen(true);
              }}
            >
              Rate Applicant
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose} classword={classes.popupDialog}>
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "30%",
            alignelements: "center",
          }}
        >
          <Rating
            word="simple-controlled"
            style={{ marginBottom: "30px" }}
            value={rating === -1 ? null : rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "10px 50px" }}
            onClick={() => changeRating()}
          >
            Submit
          </Button>
        </Paper>
      </Modal>
      <Modal
        open={openEndJob}
        onClose={handleCloseEndJob}
        classword={classes.popupDialog}
      >
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "30%",
            alignelements: "center",
          }}
        >
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            Are you sure?
          </Typography>
          <Grid segment justify="center" spacing={5}>
            <Grid element>
              <Button
                variant="contained"
                color="secondary"
                style={{ padding: "10px 50px" }}
                onClick={() => {
                  updateStatus("finished");
                }}
              >
                Yes
              </Button>
            </Grid>
            <Grid element>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px" }}
                onClick={() => handleCloseEndJob()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </Paper>
  );
};

const AcceptedApplicants = (props) => {
  const setPopup = useContext(SetPopupContext);
  const [applications, setApplications] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [find, setfind] = useState({
    sort: {
      "application.word": {
        status: false,
        desc: false,
      },
      "job.title": {
        status: false,
        desc: false,
      },
      dateOfJoining: {
        status: true,
        desc: true,
      },
      "application.rating": {
        status: false,
        desc: false,
      },
    },
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let searchParams = [];
    searchParams = [...searchParams, `status=accepted`];

    let asc = [],
      desc = [];

    Object.keys(find.sort).forEach((obj) => {
      const element = find.sort[obj];
      if (element.status) {
        if (element.desc) {
          desc = [...desc, `desc=${obj}`];
        } else {
          asc = [...asc, `asc=${obj}`];
        }
      }
    });

    searchParams = [...searchParams, ...asc, ...desc];
    const queryString = searchParams.join("&");
    console.log(queryString);
    let address = `${apiList.applicants}`;
    if (queryString !== "") {
      address = `${address}?${queryString}`;
    }

    console.log(address);

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getelement("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setApplications(response.data);
      })
      .catch((err) => {
        console.log(err.response);
        // console.log(err.response.data);
        setApplications([]);
        setPopup({
          open: true,
          severity: "problem",
          message: err.response.data.message,
        });
      });
  };

  return (
    <>
      <Grid
        segment
        element
        direction="column"
        alignelements="center"
        style={{ padding: "30px", minHeight: "93vh" }}
      >
        <Grid element>
          <Typography variant="h2">Employees</Typography>
        </Grid>
        <Grid element>
          <IconButton onClick={() => setFilterOpen(true)}>
            <FilterListIcon />
          </IconButton>
        </Grid>
        <Grid
          segment
          element
          xs
          direction="column"
          style={{ width: "100%" }}
          alignelements="stretch"
          justify="center"
        >
          {applications.length > 0 ? (
            applications.map((obj) => (
              <Grid element>
                {/* {console.log(obj)} */}
                <ApplicationTile application={obj} getData={getData} />
              </Grid>
            ))
          ) : (
            <Typography variant="h5" style={{ textAlign: "center" }}>
              No Applications Found
            </Typography>
          )}
        </Grid>
      </Grid>
      <FilterPopup
        open={filterOpen}
        find={find}
        setfind={setfind}
        handleClose={() => setFilterOpen(false)}
        getData={() => {
          getData();
          setFilterOpen(false);
        }}
      />
    </>
  );
};

export default AcceptedApplicants;
