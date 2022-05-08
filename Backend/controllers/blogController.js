/**
 * @author Vishal Rakesh Jaiswal
 * @email vs928999@dal.ca
 */
import Blog from "../models/blogModel.js";
const addBlog = async (req, res) => {
    var blogData = new Blog(req.body);
    blogData.save()
          .then(item => {
              return res.status(200).json({
                data: true,  
                message:"Blog saved to database",
                status:true
              });
          })
          .catch(err => {
              return res.status(400).json({
                  data: false,
                  message: "Unable to save to database",
                  status: false
              });
          });
  }

  const fetchBlog = async (req, res) => {
    Blog.find((err, docs) => {
        if (!err) {
            res.status(200).json({
                data: docs,
                message:"Blogs fetched",
                status: true
            });
        } else {
            return res.status(400).json({
                data: false,
                message: "Failed to fetch Blogs",
                status: false
            });
        }
    });
  }

export { addBlog, fetchBlog };
