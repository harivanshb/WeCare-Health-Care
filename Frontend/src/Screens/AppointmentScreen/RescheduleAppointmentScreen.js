/**
 * @author Harivansh Bhatia
 * @email hr513288@dal.ca
 */

import React, { useState, useEffect } from "react";
import MainScreen from "../../Components/MainScreen";
import { Form, Row, Col } from "react-bootstrap";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useHistory } from "react-router-dom";

function RescheduleAppointmentScreen(props) {
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [specialInstruction, setSpecialInstruction] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = props.history.location.state;
    formData.selectedDate = selectedDate.toDateString();
    formData.selectedTime = selectedDate.toTimeString();
    formData.dateTime = selectedDate;
    formData.specialInstruction = specialInstruction;

    axios.put(`/api/docappointment/${formData._id}`, formData).then((res) => {
      if (res.status === 200) {
        history.push("/viewappointment");
      }
    });
  };

  useEffect(() => {
    setSpecialInstruction(props.history.location.state.specialInstruction);
  }, []);

  return (
    <MainScreen title="Reschedule Appointment">
      <div>
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
                  value={props.history.location.state.patientName}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="emailid">
                <Form.Label className="font-weight-bold">
                  Patient Email Id:
                </Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={props.history.location.state.email}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="specialInstruction">
                <Form.Label className="font-weight-bold">
                  Special Instruction:
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description of Appointment"
                  value={specialInstruction}
                  onChange={(e) => setSpecialInstruction(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="docName">
                <Form.Label className="font-weight-bold">
                  Doctor Name and Specilization:
                </Form.Label>
                <Form.Control
                  readOnly
                  type="text"
                  value={props.history.location.state.docSelected}
                ></Form.Control>
              </Form.Group>

              {/* referenced from https://www.youtube.com/watch?v=tojwQEdI-QI 
                        and https://reactdatepicker.com/#example-include-times */}
              <Form.Group controlId="calendar">
                <Form.Label className="font-weight-bold">
                  Pick a new Date and Time to Book your Appointment
                </Form.Label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  showTimeSelect
                  timeIntervals={30}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  minTime={setHours(setMinutes(new Date(), 0), 11)}
                  maxTime={setHours(setMinutes(new Date(), 30), 20)}
                ></DatePicker>
              </Form.Group>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  required
                  className="btn btn-primary mt-1 d-flex justify-content-center"
                >
                  Reschedule Appointment
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default RescheduleAppointmentScreen;
