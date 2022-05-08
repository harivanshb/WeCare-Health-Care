/**
 * @author Harivansh Bhatia
 * @email hr513288@dal.ca
 */

import React, { useState, useEffect } from "react";
import MainScreen from "../../Components/MainScreen";
import { Form, Row, Col, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../../Components/ErrorMessage";

function BookAppointmentScreen() {
  let history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [error, setError] = useState(false);
  const [doctorNames, setDoctorNames] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("1");
  const [specialInstruction, setSpecialInstruction] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );

  const findDocs = async () => {
    const response = await fetch("/api/users/doctorNames")
      .then((response) => response.json())
      .then((json) => {
        setDoctorNames(json);
      });
  };

  useEffect(() => {
    findDocs();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDoctor === "1") {
      setError(true);
    } else {
      let formData = {};
      formData.patientName = userInfo.name;
      formData.email = userInfo.email;
      formData.docSelected = selectedDoctor;
      formData.selectedDate = selectedDate.toDateString();
      formData.specialInstruction = specialInstruction;
      formData.selectedTime = selectedDate.toTimeString();
      formData.dateTime = selectedDate;

      axios
        .post("/api/docappointment/booking", {
          data: formData,
        })
        .then((res) => {
          if (res.status === 200) {
            alert("Appointment Successfully Booked");
            history.push("/viewappointment");
          }
        });
    }
  };

  const handleSelectChange = (e) => {
    setSelectedDoctor(e.target.value);
    setError(false);
  };

  return (
    <MainScreen title="Book Appointment">
      <div>
        <Container className="border border-primary p-4">
          <Row>
            <Col md={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label className="font-weight-bold">
                    Patient Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    value={userInfo.name}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="emailid">
                  <Form.Label className="font-weight-bold">
                    Patient Email Id:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    value={userInfo.email}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="specialInstruction">
                  <Form.Label className="font-weight-bold">
                    Special Instruction:
                  </Form.Label>
                  <Form.Control
                    type="instructions"
                    placeholder="Enter Description of Appointment"
                    onChange={(e) => setSpecialInstruction(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="docName">
                  <Form.Label className="font-weight-bold">
                    Doctor Name and Specilization
                  </Form.Label>
                  <Form.Control
                    as="select"
                    aria-label="Doc Name"
                    onChange={handleSelectChange}
                  >
                    <option key="1" value="1">
                      Please select the doctor to book an appointment with
                    </option>
                    (
                    {doctorNames.map((doctor) => (
                      <option key={doctor._id} value={doctor.name}>
                        {doctor.name}
                      </option>
                    ))}
                  </Form.Control>
                  {error ? (
                    <ErrorMessage variant="danger">
                      Please select a doctor
                    </ErrorMessage>
                  ) : (
                    ""
                  )}
                </Form.Group>

                {/* referenced from https://www.youtube.com/watch?v=tojwQEdI-QI 
                        and https://reactdatepicker.com/#example-include-times */}
                <Form.Group controlId="calendar">
                  <Form.Label className="font-weight-bold">
                    Pick a Date and Time to Book your Appointment
                  </Form.Label>
                  <div className="w-100">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      showTimeSelect
                      timeIntervals={30}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      minTime={setHours(setMinutes(new Date(), 0), 11)}
                      maxTime={setHours(setMinutes(new Date(), 30), 20)}
                    ></DatePicker>
                  </div>
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    required
                    className="btn btn-primary mt-1 d-flex justify-content-center"
                  >
                    Book Appointment
                  </button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </MainScreen>
  );
}

export default BookAppointmentScreen;
