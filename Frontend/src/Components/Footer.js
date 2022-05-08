import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "1rem",
        padding: "1rem",
        backgroundColor: "#008080",
        position: "absolute",
        marginBottom: "0",
        left: "0",
        width: "100%"
      }}
    >
      <Container>
        <Row>
        <Col>
            <Row className="text-light">About Us</Row>
            <Row className="text-light">We are emerging healthcare solutions</Row>
            <Row className="text-light">proving project. Our mission</Row>
            <Row className="text-light">is to ensure that technology changes</Row>
            <Row className="text-light">healthcare sector</Row>
          </Col>
          <Col className="ml-2">
            <Row className="text-light">Contact Us</Row>
            <Row className="text-light">Mobile: +1(903)322442</Row>
            <Row className="text-light">Landline: (206)23135453</Row>
            <Row className="text-light">Email: wecaresolutiona@gmail.com</Row>
          </Col>
          <Col className="text-left">
          <Row className="text-light">Address</Row>
            <Row className="text-light">6299 South St</Row>
            <Row className="text-light">Halifax, Nova Scotia</Row>
            <Row className="text-light">B3H 4R2</Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

