const express = require("express");
const router = express.Router();
const blog = require('./../controllers/blogController')
const appConfig = require('./../config/appConfig')
const auth = require('./../middleware/auth')
module.exports.setRouter = (app) => {

    let baseUrl = appConfig.apiVersion + '/blogs';
    app.get(baseUrl + "/all", auth.isAuthenticated, blog.getAllBlog);
    app.get(baseUrl + "/view/:blogId", auth.isAuthenticated, blog.viewByBlogId);
    app.get(
      baseUrl + "/view/by/author/:author",
      auth.isAuthenticated,
      blog.viewByAuthor
    );
    app.get(
      baseUrl + "/view/by/category/:category",
      auth.isAuthenticated,
      blog.viewByCategory
    );
    app.post(
      baseUrl + "/:blogId/delete",
      auth.isAuthenticated,
      blog.deleteBlog
    );
    app.put(baseUrl + "/:blogId/edit", auth.isAuthenticated, blog.editBlog);
    app.post(baseUrl + "/create", auth.isAuthenticated, blog.createBlog);
    app.get(
      baseUrl + "/:blogId/count/view",
      auth.isAuthenticated,
      blog.increaseBlogView
    );

}
