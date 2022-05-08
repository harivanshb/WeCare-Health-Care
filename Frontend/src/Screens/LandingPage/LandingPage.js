import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container, Row } from "react-bootstrap";
import "./LandingStyles.css";

function LandingPage({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  return (
    <div className="screenpage">
      <Container>
        <Row>
          <div className="headingtext">
            <div className="buttons">
              <Link to="/login">
                <Button size="lg" className="buttonstyle">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="buttonstyle"
                >
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
