/**
 * @author Harivansh Bhatia
 * @email hr513288@dal.ca
 */

import MainScreen from "../../Components/MainScreen";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ViewAppointmentScreen() {
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [appointmentData, setAppointmentData] = useState([]);

  const findAppointments = async (props) => {
    const response = await axios
      .get(`/api/docappointment/${props}`)
      .then((response) => setAppointmentData(response.data));
  };

  //referenced from https://www.freecodecamp.org/news/how-to-perform-crud-operations-using-react/
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete your appointment?")) {
      axios.delete(`/api/docappointment/${id}`);
      findAppointments(userInfo.email);
    }
  };

  const handleReschedule = (data) => {
    if (
      window.confirm("Are you sure you want to reschedule your appointment?")
    ) {
      history.push({ pathname: "/rescheduleappointment", state: data });
    }
  };

  useEffect(() => {
    findAppointments(userInfo.email);
  }, []);

  return (
    <MainScreen title="View Appointment ">
      {appointmentData.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Appointment Booked with Doctor</th>
              <th>Appointment Time</th>
              <th>Appointment Date</th>
              <th>Special Instruction</th>
              <th>Reschedule/Cancel</th>
            </tr>
          </thead>
          <tbody>
            {appointmentData.map((data) => (
              <tr key={data._id}>
                <td>{data.patientName}</td>
                <td>{data.docSelected}</td>
                <td>{data.selectedTime}</td>
                <td>{data.selectedDate}</td>
                <td>{data.specialInstruction}</td>
                <td>
                  <Button onClick={() => handleReschedule(data)}>
                    Reschedule
                  </Button>
                  <Button onClick={() => handleDelete(data._id)}>Cancel</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h2 className="heading font-weight-bold text-center ">
          You have no appointments...
        </h2>
      )}
    </MainScreen>
  );
}

export default ViewAppointmentScreen;
