/**
 * @author Vishal Rakesh Jaiswal
 * @email vs928999@dal.ca
 */
import React from "react";
import "./Post.css";
const Post = ({ post: { title, description,
content, author }, index }) => {
return (
	<div className="post-container">
	<h1 className="headings">{title}</h1>
	<center><img className="image" src={content} alt="post" /></center>
	<p>{description}</p>
	<div className="info">	
		<h4>Written by: {author}</h4>
	</div>
	</div>
);
};

export default Post;
