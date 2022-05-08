import React from "react";
import { Spinner } from "react-bootstrap";

function Loading({ size = 80 }) {
  return (
    <div style={{display: "flex",justifyContent: "left",alignItems: "center",height: "80%",width: "80%",}}>
      <Spinner style={{height: size,width: size,}}animation="border"/>
    </div>
  );
}
export default Loading;
