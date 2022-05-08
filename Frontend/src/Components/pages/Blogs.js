/**
 * @author Vishal Rakesh Jaiswal
 * @email vs928999@dal.ca
 */
import React, { useState, useEffect } from "react";
import Posts from "../Posts/Posts";
import { Form, Button, Row, Col } from "react-bootstrap";
import {useSelector} from "react-redux";


const Blogs = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
   // const [userInfo, setUserInfo] = useState([])
        if (userInfo != null && userInfo.ispatient === "false" && !userInfo.isAdmin) {
            return (
                <div className="main-container">
                    <h1 className="main-heading">

                        <center>Blog Page</center>
                    </h1>
                    <Button href="/postblog">Create your blog</Button>


                    <Posts/>
                </div>
            );
        } else {
            return (
                <div className="main-container">

                    <h1 className="main-heading">
                        <center>BLOG PAGE</center>
                    </h1>


                    <Posts/>
                </div>
            );
        }
}
export default Blogs;
