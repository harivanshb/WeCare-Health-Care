//sanika ->sn820051@dal.ca
//Profile page frontend, used form, userupdate state and submit handler to submit the edit profile form. 
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../Components/MainScreen";
import Loading from "../../Components/Loading";
import "./ProfileScreen.css";
import ErrorMessage from "../../Components/ErrorMessage";
import { updateProfile } from "../../Apiactions/userapis";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [history, userInfo]);

    const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, password }));
  };

  return (
    <MainScreen title="PROFILE SECTION">
      <div>
        <Row className="section">
          <Col md={8}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              {success && (<ErrorMessage variant="success"> Profile Updated Successfully</ErrorMessage>)}
              <Form.Group controlId="name">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter Email"value={email} onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" varient="primary">
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
