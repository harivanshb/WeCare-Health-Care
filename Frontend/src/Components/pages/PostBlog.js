/**
 * @author Vishal Rakesh Jaiswal
 * @email vs928999@dal.ca
 */
import React, { useState, useEffect } from "react";
import { postBlog } from '../../Store/store';
import { Form, Button, Row, Col } from "react-bootstrap";
import Footer from "../../Components/Footer";
import Loading from "../../Components/Loading";
import ErrorMessage from "../../Components/ErrorMessage";
import MainScreen from "../../Components/MainScreen";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux";


const PostBlog = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    //const [userInfo, setUserInfo] = useState([])
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            title,
            description,
            content
        }
        console.log(data);

        const result = await postBlog(data);
        toast("Blog created successfully")
        console.log(result);
    }

    // useEffect(() => {
    //     setUserInfo(JSON.parse(localStorage.getItem("userInfo")))
    // }, [])
    if (userInfo.ispatient==="false") {
        return (
            <MainScreen title="BLOG PAGE">
                <div>
                <ToastContainer />
                    <Row className="profileContainer">
                        <Col md={6}>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="blogtitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)} ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="blogdescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter blogdescription "
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}  ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="blogcontent">
                                    <Form.Label>ImageURL</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter ImageURL "
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}                              ></Form.Control>
                                </Form.Group>

                                <Button type="submit" varient="primary">
                                    Create Blog
                                </Button>
                            </Form>
                        </Col>
                        <Col
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                        </Col>
                    </Row>
                </div>
            </MainScreen>
        );
    };
};
    export default PostBlog;

/* <div className="main-container">
    <h1 className="main-heading">
        <center>BLOG PAGE</center></h1>
    <form onSubmit={handleSubmit} method="POST">
        <div class="control-group">
            <div class="form-group floating-label-form-group controls">
                <label for="blogtitle">Title</label>
                <input type="text" id="blogtitle" name="title" placeholder="Title" onChange={(e) => setTitle(e.target.value)} class="form-control">
                </input>
            </div>
        </div>
        <div class="control-group">
            <div class="form-group floating-label-form-group controls">
                <label for="blogdescription">Description</label>
                <textarea id="blogdescription" name="description" placeholder="Description" onChange={(e) => setDescription(e.target.value)} class="form-control">
                </textarea>
            </div>
        </div>
        <div class="control-group">
            <div class="form-group floating-label-form-group controls">
                <label for="blogcontent">ImageURL</label>
                <input type="text" name="content" id="blogcontent" placeholder="Content ..." onChange={(e) => setContent(e.target.value)} cols="30" rows="10" class="form-control"></input>
            </div>
        </div>
        <div class="form-group my-4 text-center">
            <button type="submit" class="btn btn-primary">Create Post</button>
        </div>
    </form>
</div></>
);
} else {
return (
<div className="main-container">
<h1 className="main-heading">
    <center>BLOG PAGE</center></h1>
<br />
<br />
<br />
<h3>Unfortunately! You don't have access to post a Blog</h3>
</div>
);
} */

