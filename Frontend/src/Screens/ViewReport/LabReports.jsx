/**
 * @author Farhin Damania
 * @email fr454807@dal.ca
 */

import "./Reports.css"
import {DataGrid} from "@mui/x-data-grid";
import { Col, Container, Row, Table } from "react-bootstrap";

import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
const axios = require("axios").default;


function LabReports({ history }){
  const [reports, setReports] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  
  if (!userInfo) {
    history.push("/login");
  }
//calling the get api
  useEffect(() => {
    axios
      .get(`/api/pathology/getPathaAppointment?email=${userInfo.email}`)
      .then((res) => {
        setReports(res.data);
      });
  }, [userInfo.email]);

    console.log(reports)
    //styling the html
    return(
      <Container>
        <Row>
        <Col>
          <h1 className="h1">View Lab Reports </h1>
        </Col>
      </Row>

      <Row>
        <div style={{marginLeft:"60px"}}>
          <Col >
            <Table striped bordered hover responsive style={{ marginTop: "30px",width:"1000px"}}>
              <thead className="head">
                <tr >
                  <th>S.No.</th>
                  <th>Date</th>
                  <th>Test</th>
                  <th>Status</th>
                  <th>Comments</th>
                  <th>Cost</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody >
                {/* mapping the record entered in upload report with their mathing field and displaying it in tables */}
                {reports.map((x, i) => {
                  return (
                    <>
                      <tr style={{paddingRight:"70px"}}>
                        <td className="td">{i + 1}</td>
                        <td className="td">{x.date}</td>
                        <td className="td">{x.testType}</td>
                        <td className="status" style={{width:"100px"}} >{x.status}</td>
                        <td className="td">{x.comments}</td>
                        <td className="td">{x.cost}</td>
                     
                     
                        <td className="td">
                          <a
                            href={x.docURI}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            VIEW REPORT
                          </a>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </div>
      </Row>
      </Container>
    )
}

export default LabReports;