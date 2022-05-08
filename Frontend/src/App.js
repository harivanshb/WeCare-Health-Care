// import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import NormalDashboard from "./Components/Dashboard/NormalDashboard";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import LandingPage from "./Screens/LandingPage/LandingPage";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import { useState } from "react";
import ProfileScreen from "./Screens/ProfileScreen/ProfileScreen";
// export default App;
// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/pages";
import Blogs from "./Components/pages/Blogs";
import SignUp from "./Components/pages/Signup";
import PostBlog from "./Components/pages/PostBlog";
import Login from "./Components/pages/Login";
import BookAppointmentScreen from "./Screens/AppointmentScreen/BookAppointmentScreen";
import ViewAppointmentScreen from "./Screens/AppointmentScreen/ViewAppointmentScreen";
import RescheduleAppointmentScreen from "./Screens/AppointmentScreen/RescheduleAppointmentScreen";
import Chatbot from "./Components/Chatbot/Chatbot";
import LabReports from "./Screens/ViewReport/LabReports";
import ReportUpload from "./Screens/ReportUpload/ReportUpload";
import Stripe from "./Screens/PaymentModule/Stripe";


function App() {
  const [search, setSearch] = useState("");
  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <Chatbot />
      <main className="App">
        {/* <Route path="/" element={<AdminDashboard />} /> */}
        <Route path="/" exact component={LandingPage} />
        <Route path="/AdminDashboard" component={AdminDashboard} />
        <Route path="/NormalDashboard" component={NormalDashboard} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/blogs" component={Blogs} />
        <Route path="/postblog" component={PostBlog} />
        <Route path="/appointment" component={BookAppointmentScreen} />
        <Route path="/viewappointment" component={ViewAppointmentScreen} />
        <Route path="/viewreports" component={LabReports} />
        <Route path="/uploadreport" component={ReportUpload} />
        <Route path="/paymentform" component={Stripe}/>
        <Route
          path="/rescheduleappointment"
          component={RescheduleAppointmentScreen}
        />
        
      </main>
      <Footer />
    </Router>
  );
}

export default App;
