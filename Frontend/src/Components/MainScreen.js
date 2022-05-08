import React from "react";
import "./Screen.css";
import { Row,Container } from "react-bootstrap";

function MainScreen({ children, title }) {
  return (
    <div className="showscreen">
      <Container>
        <Row>
          <div className="design">
            {title && (
              <>
                <h1 className="heading">{title}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default MainScreen;
