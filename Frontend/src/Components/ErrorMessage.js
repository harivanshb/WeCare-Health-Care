import { Alert } from "react-bootstrap";
import React from "react";

const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 15 }}>
      <p>{children}</p>
    </Alert>
  );
};

export default ErrorMessage;
