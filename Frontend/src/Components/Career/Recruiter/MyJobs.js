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
  MenuItem,
  Checkbox,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { SetPopupContext } from "../../App";

import apiList from "../../lib/apiList";
import { SystemUpdate } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  button: {
    width: "100%",
    height: "100%",
  },
  worktOuter: {
    padding: "30px",
    margin: "20px 0",
    boxSizing: "border-box",
    width: "100%",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statusBlock: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
}));

const workt = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const { work, getData } = props;
  const setPopup = useContext(SetPopupContext);

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [workDetails, setworkDetails] = useState(work);

  console.log(workDetails);

  const handleInput = (key, value) => {
    setworkDetails({
      ...workDetails,
      [key]: value,
    });
  };

  const handleClick = (location) => {
    history.push(location);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleDelete = () => {
    console.log(work._id);
    axios
      .delete(`${apiList.works}/${work._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((register) => {
        setPopup({
          open: true,
          severity: "pass",
          message: register.data.message,
        });
        getData();
        handleClose();
      })
      .catch((err) => {
        console.log(err.register);
        setPopup({
          open: true,
          severity: "error",
          message: err.register.data.message,
        });
        handleClose();
      });
  };

  const handleworkUpdate = () => {
    axios
      .put(`${apiList.works}/${work._id}`, workDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((register) => {
        setPopup({
          open: true,
          severity: "pass",
          message: register.data.message,
        });
        getData();
        handleCloseUpdate();
      })
      .catch((err) => {
        console.log(err.register);
        setPopup({
          open: true,
          severity: "error",
          message: err.register.data.message,
        });
        handleCloseUpdate();
      });
  };

  const postedOn = new Date(work.dateOfPosting);

  return (
    <Paper name={classes.worktOuter} elevation={3}>
      <Grid block>
        <Grid block item xs={9} spacing={1} direction="column">
          <Grid item>
            <Typography variant="h5">{work.title}</Typography>
          </Grid>
          <Grid item>
            <Rating value={work.rating !== -1 ? work.rating : null} readOnly />
          </Grid>
          <Grid item>Role : {work.workType}</Grid>
          {/* Can change the symbol here */}
          <Grid item>Salary : &#8377; {work.salary} per month</Grid>
          <Grid item>
            Duration :{" "}
            {work.duration !== 0 ? `${work.duration} month` : `Flexible`}
          </Grid>
          <Grid item>Date Of Posting: {postedOn.toLocaleDateString()}</Grid>
          <Grid item>Number of Applicants: {work.maxApplicants}</Grid>
          <Grid item>
            Remaining Number of Positions:{" "}
            {work.maxPositions - work.acceptedCandidates}
          </Grid>
          <Grid item>
            {work.skillsets.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }} />
            ))}
          </Grid>
        </Grid>
        <Grid item block direction="column" xs={3}>
          <Grid item xs>
            <Button
              variant="contained"
              color="primary"
              name={classes.statusBlock}
              onClick={() => handleClick(`/work/applications/${work._id}`)}
            >
              View Applications
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              name={classes.statusBlock}
              onClick={() => {
                setOpenUpdate(true);
              }}
              style={{
                background: "#FC7A1E",
                color: "#fff",
              }}
            >
              Update Details
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              name={classes.statusBlock}
              onClick={() => {
                setOpen(true);
              }}
            >
              Delete work
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose} name={classes.popupDialog}>
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "30%",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            Are you sure?
          </Typography>
          <Grid block justify="center" spacing={5}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                style={{ padding: "10px 50px" }}
                onClick={() => handleDelete()}
              >
                Delete
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px" }}
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
      <Modal
        open={openUpdate}
        onClose={handleCloseUpdate}
        name={classes.popupDialog}
      >
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "30%",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            Update Details
          </Typography>
          <Grid
            block
            direction="column"
            spacing={3}
            style={{ margin: "10px" }}
          >
            <Grid item>
              <TextField
                label="Application Deadline"
                type="datetime-local"
                value={workDetails.deadline.substr(0, 16)}
                onChange={(event) => {
                  handleInput("deadline", event.target.value);
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
                value={workDetails.maxApplicants}
                onChange={(event) => {
                  handleInput("maxApplicants", event.target.value);
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
                value={workDetails.maxPositions}
                onChange={(event) => {
                  handleInput("maxPositions", event.target.value);
                }}
                InputProps={{ inputProps: { min: 1 } }}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid block justify="center" spacing={5}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                style={{ padding: "10px 50px" }}
                onClick={() => handleworkUpdate()}
              >
                Update
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px" }}
                onClick={() => handleCloseUpdate()}
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

const FilterPopup = (props) => {
  const classes = useStyles();
  const { open, handleClose, SystemUpdate, setSystemUpdate, getData } = props;
  return (
    <Modal open={open} onClose={handleClose} name={classes.popupDialog}>
      <Paper
        style={{
          padding: "50px",
          outline: "none",
          minWidth: "50%",
        }}
      >
        <Grid block direction="column" alignItems="center" spacing={3}>
          <Grid block item alignItems="center">
            <Grid item xs={3}>
              work Type
            </Grid>
            <Grid
              block
              item
              xs={9}
              justify="space-around"
              // alignItems="center"
            >
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="fullTime"
                      checked={SystemUpdate.workType.fullTime}
                      onChange={(event) => {
                        setSystemUpdate({
                          ...SystemUpdate,
                          workType: {
                            ...SystemUpdate.workType,
                            [event.target.name]: event.target.checked,
                          },
                        });
                      }}
                    />
                  }
                  label="Full Time"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="partTime"
                      checked={SystemUpdate.workType.partTime}
                      onChange={(event) => {
                        setSystemUpdate({
                          ...SystemUpdate,
                          workType: {
                            ...SystemUpdate.workType,
                            [event.target.name]: event.target.checked,
                          },
                        });
                      }}
                    />
                  }
                  label="Part Time"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="wfh"
                      checked={SystemUpdate.workType.wfh}
                      onChange={(event) => {
                        setSystemUpdate({
                          ...SystemUpdate,
                          workType: {
                            ...SystemUpdate.workType,
                            [event.target.name]: event.target.checked,
                          },
                        });
                      }}
                    />
                  }
                  label="Work From Home"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid block item alignItems="center">
            <Grid item xs={3}>
              Salary
            </Grid>
            <Grid item xs={9}>
              <Slider
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => {
                  return value * (100000 / 100);
                }}
                marks={[
                  { value: 0, label: "0" },
                  { value: 100, label: "100000" },
                ]}
                value={SystemUpdate.salary}
                onChange={(event, value) =>
                  setSystemUpdate({
                    ...SystemUpdate,
                    salary: value,
                  })
                }
              />
            </Grid>
          </Grid>
          <Grid block item alignItems="center">
            <Grid item xs={3}>
              Duration
            </Grid>
            <Grid item xs={9}>
              <TextField
                select
                label="Duration"
                variant="outlined"
                fullWidth
                value={SystemUpdate.duration}
                onChange={(event) =>
                  setSystemUpdate({
                    ...SystemUpdate,
                    duration: event.target.value,
                  })
                }
              >
                <MenuItem value="0">All</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid block item alignItems="center">
            <Grid item xs={3}>
              Sort
            </Grid>
            <Grid item block direction="row" xs={9}>
              <Grid
                item
                block
                xs={4}
                justify="space-around"
                alignItems="center"
                style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
              >
                <Grid item>
                  <Checkbox
                    name="salary"
                    checked={SystemUpdate.sort.salary.status}
                    onChange={(event) =>
                      setSystemUpdate({
                        ...SystemUpdate,
                        sort: {
                          ...SystemUpdate.sort,
                          salary: {
                            ...SystemUpdate.sort.salary,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="salary"
                  />
                </Grid>
                <Grid item>
                  <label for="salary">
                    <Typography>Salary</Typography>
                  </label>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!SystemUpdate.sort.salary.status}
                    onClick={() => {
                      setSystemUpdate({
                        ...SystemUpdate,
                        sort: {
                          ...SystemUpdate.sort,
                          salary: {
                            ...SystemUpdate.sort.salary,
                            desc: !SystemUpdate.sort.salary.desc,
                          },
                        },
                      });
                    }}
                  >
                    {SystemUpdate.sort.salary.desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                item
                block
                xs={4}
                justify="space-around"
                alignItems="center"
                style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
              >
                <Grid item>
                  <Checkbox
                    name="duration"
                    checked={SystemUpdate.sort.duration.status}
                    onChange={(event) =>
                      setSystemUpdate({
                        ...SystemUpdate,
                        sort: {
                          ...SystemUpdate.sort,
                          duration: {
                            ...SystemUpdate.sort.duration,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="duration"
                  />
                </Grid>
                <Grid item>
                  <label for="duration">
                    <Typography>Duration</Typography>
                  </label>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!SystemUpdate.sort.duration.status}
                    onClick={() => {
                      setSystemUpdate({
                        ...SystemUpdate,
                        sort: {
                          ...SystemUpdate.sort,
                          duration: {
                            ...SystemUpdate.sort.duration,
                            desc: !SystemUpdate.sort.duration.desc,
                          },
                        },
                      });
                    }}
                  >
                    {SystemUpdate.sort.duration.desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                item
                block
                xs={4}
                justify="space-around"
                alignItems="center"
                style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
              >
                <Grid item>
                  <Checkbox
                    name="rating"
                    checked={SystemUpdate.sort.rating.status}
                    onChange={(event) =>
                      setSystemUpdate({
                        ...SystemUpdate,
                        sort: {
                          ...SystemUpdate.sort,
                          rating: {
                            ...SystemUpdate.sort.rating,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="rating"
                  />
                </Grid>
                <Grid item>
                  <label for="rating">
                    <Typography>Rating</Typography>
                  </label>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!SystemUpdate.sort.rating.status}
                    onClick={() => {
                      setSystemUpdate({
                        ...SystemUpdate,
                        sort: {
                          ...SystemUpdate.sort,
                          rating: {
                            ...SystemUpdate.sort.rating,
                            desc: !SystemUpdate.sort.rating.desc,
                          },
                        },
                      });
                    }}
                  >
                    {SystemUpdate.sort.rating.desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
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

const Myworks = (props) => {
  const [works, setworks] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [SystemUpdate, setSystemUpdate] = useState({
    query: "",
    workType: {
      fullTime: false,
      partTime: false,
      wfh: false,
    },
    salary: [0, 100],
    duration: "0",
    sort: {
      salary: {
        status: false,
        desc: false,
      },
      duration: {
        status: false,
        desc: false,
      },
      rating: {
        status: false,
        desc: false,
      },
    },
  });

  const setPopup = useContext(SetPopupContext);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let searchParams = [`myworks=1`];
    if (SystemUpdate.query !== "") {
      searchParams = [...searchParams, `q=${SystemUpdate.query}`];
    }
    if (SystemUpdate.workType.fullTime) {
      searchParams = [...searchParams, `workType=Full%20Time`];
    }
    if (SystemUpdate.workType.partTime) {
      searchParams = [...searchParams, `workType=Part%20Time`];
    }
    if (SystemUpdate.workType.wfh) {
      searchParams = [...searchParams, `workType=Work%20From%20Home`];
    }
    if (SystemUpdate.salary[0] != 0) {
      searchParams = [
        ...searchParams,
        `salaryMin=${SystemUpdate.salary[0] * 1000}`,
      ];
    }
    if (SystemUpdate.salary[1] != 100) {
      searchParams = [
        ...searchParams,
        `salaryMax=${SystemUpdate.salary[1] * 1000}`,
      ];
    }
    if (SystemUpdate.duration != "0") {
      searchParams = [...searchParams, `duration=${SystemUpdate.duration}`];
    }

    let asc = [],
      desc = [];

    Object.keys(SystemUpdate.sort).forEach((obj) => {
      const item = SystemUpdate.sort[obj];
      if (item.status) {
        if (item.desc) {
          desc = [...desc, `desc=${obj}`];
        } else {
          asc = [...asc, `asc=${obj}`];
        }
      }
    });
    searchParams = [...searchParams, ...asc, ...desc];
    const queryString = searchParams.join("&");
    console.log(queryString);
    let address = apiList.works;
    if (queryString !== "") {
      address = `${address}?${queryString}`;
    }

    console.log(address);
    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((register) => {
        console.log(register.data);
        setworks(register.data);
      })
      .catch((err) => {
        console.log(err.register.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  return (
    <>
      <Grid
        block
        item
        direction="column"
        alignItems="center"
        style={{ padding: "30px", minHeight: "93vh" }}
      >
        <Grid
          item
          block
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs>
            <Typography variant="h2">My works</Typography>
          </Grid>
          <Grid item xs>
            <TextField
              label="Search works"
              value={SystemUpdate.query}
              onChange={(event) =>
                setSystemUpdate({
                  ...SystemUpdate,
                  query: event.target.value,
                })
              }
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  getData();
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={() => getData()}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{ width: "500px" }}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <IconButton onClick={() => setFilterOpen(true)}>
              <FilterListIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Grid
          block
          item
          xs
          direction="column"
          alignItems="stretch"
          justify="center"
        >
          {works.length > 0 ? (
            works.map((work) => {
              return <workt work={work} getData={getData} />;
            })
          ) : (
            <Typography variant="h5" style={{ textAlign: "center" }}>
              No works found
            </Typography>
          )}
        </Grid>
      </Grid>
      <FilterPopup
        open={filterOpen}
        SystemUpdate={SystemUpdate}
        setSystemUpdate={setSystemUpdate}
        handleClose={() => setFilterOpen(false)}
        getData={() => {
          getData();
          setFilterOpen(false);
        }}
      />
    </>
  );
};

export default Myworks;
