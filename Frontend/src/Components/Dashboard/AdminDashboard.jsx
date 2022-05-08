/**
 * @author Prerak Choksi
 * @email pc@dal.ca
 */
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

const axios = require("axios").default;
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const vaccineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const AdminDashboard = ({ history }) => {
  const [empCountGender, setEmpCountGender] = useState([]);
  const [empCountDept, setEmpCountDept] = useState([]);
  const [appointmentMonthly, setAppointmentMonthly] = useState([]);
  const [empCountWork, setEmpCountWork] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo) {
    history.push("/login");
  }

  const vaccineBookdata = {
    labels: appointmentMonthly.map((x) => x.month),
    datasets: [
      {
        label: "Total Vaccination",
        data: appointmentMonthly.map((x) => x.count),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  //api calls
  //getting the count of employees by department
  useEffect(() => {
    axios.get("/api/dashboard/getEmployeeByDepartment/").then((res) => {
      const females = res.data.females;
      const males = res.data.males;
      const others = res.data.others;

      const departments = Array.from(
        new Set(
          females.map((x) => x._id),
          males.map((x) => x._id),
          others.map((x) => x._id)
        )
      );

      var countByDept = {};
      for (var i = 0; i < departments.length; i++) {
        countByDept[departments[i]] = {
          male:
            males
              .filter((x) => x._id == departments[i])
              .map((x) => x.count)[0] || 0,
          female:
            females
              .filter((x) => x._id == departments[i])
              .map((x) => x.count)[0] || 0,
          others:
            others
              .filter((x) => x._id == departments[i])
              .map((x) => x.count)[0] || 0,
        };
      }
      setEmpCountDept(countByDept);
    });

    //getting the count of employees by gender
    axios.get("/api/dashboard/getEmployeeByGender/").then((res) => {
      setEmpCountGender(res.data);
    });
    //getting the count of employees by working status
    axios.get("/api/dashboard/getEmployeeByWorkingStatus/").then((res) => {
      setEmpCountWork(res.data);
    });
    //getting vaccine count
    axios.get("/api/dashboard/getVaccineDetails/").then((res) => {
      setAppointmentMonthly(res.data);
    });
  }, []);
  const chartOptions = {};
  const chartData = {
    // chart.js https://react-chartjs-2.netlify.app/components/

    labels: Object.keys(empCountDept),
    datasets: [
      {
        label: "Male",
        data: Object.keys(empCountDept).map((x) => empCountDept[x].male),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.4)",
      },
      {
        label: "Female",
        data: Object.keys(empCountDept).map((x) => empCountDept[x].female),
        borderColor: "rgba()",
        backgroundColor: "rgba(11, 162, 1, 0.4)",
      },
    ],
  };

  const employeeCountByGenderdata = {
    labels: Object.keys(empCountGender),
    datasets: [
      {
        data: Object.keys(empCountGender).map((x) => empCountGender[x]),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const empWorkStyle = {
    labels: empCountWork.map && (empCountWork.map((x) => x._id) || "No Value"),
    datasets: [
      {
        // chart.js https://react-chartjs-2.netlify.app/components/
        data: empCountWork.map && empCountWork.map((x) => x.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Admin Analytics</h1>
        </Col>
      </Row>

      <Row style={{ marginBottom: "40px" }}>
        <Col lg="6" style={{ border: "1px solid" }}>
          <Row>
            <Col>
              <h5 className="text-center">Employee Count By Gender</h5>
            </Col>
          </Row>
          <Row>
            <Col style={{ height: "40vh" }}>
              <Pie
                options={{ maintainAspectRatio: false }}
                data={employeeCountByGenderdata}
              />
            </Col>
          </Row>
        </Col>
        <Col lg="6" style={{ border: "1px solid" }}>
          <Row>
            <Col>
              <h5 className="text-center">Employee Count By Department</h5>
            </Col>
          </Row>
          <Row>
            <Col style={{ height: "40vh" }}>
              <Bar options={chartOptions} data={chartData} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col lg="6" style={{ border: "1px solid" }}>
          <Row>
            <Col>
              <h5 className="text-center">Employees Working Status</h5>
            </Col>
          </Row>

          <Row>
            <Col style={{ height: "40vh" }}>
              <Pie
                options={{ maintainAspectRatio: false }}
                data={empWorkStyle}
              />
            </Col>
          </Row>
        </Col>

        <Col style={{ border: "1px solid" }}>
          <Row>
            <Col>
              <h5 className="text-center">Vaccine Dose provided (Monthly)</h5>
            </Col>
          </Row>
          <Row>
            <Line options={vaccineChartOptions} data={vaccineBookdata} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default AdminDashboard;
