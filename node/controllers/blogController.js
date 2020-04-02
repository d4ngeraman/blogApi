const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('./../libs/responseLib')
const time = require('./../libs/timeLib')
const logger = require('./../libs/loggerLib');
const BlogModel = mongoose.model('Blog');

let getAllBlog = (req, res) => {
    BlogModel.find().select('-__v').lean().exec((err, result) => {
        if(err) {
            console.log(err)
            logger.error(err.message, "Blog Controller: getAllBlog", 10)
            let apiResponse = response.generate(true, "Failed to find blog", 500, null)
            res.send(apiResponse)
        } else if(result == undefined || result == null || result == ''){
            logger.info('No Blog Found', 'Blog Controller: getAllBlog')
            let apiResponse = response.generate(true, "No Blog Found", 404, null)
            res.send(apiResponse);
        }else {
            let apiResponse = response.generate(false, "Find all blogs", 200, result)
            res.send(apiResponse)
        }
    })
}

let viewByBlogId = (req, res) => {
    BlogModel.findOne({'blogId': req.params.blogId}, (err, result) => {
        if(err){
            console.log(err);
            res.send(err)
        } else if(result == undefined || result == null || result == ''){
            console.log('No Blog Found');
            res.send('Not Found')
        } else{
            res.send(result)
        }
    })
}

let viewByCategory = (req, res) => {
    BlogModel.find({'category': req.params.category}, (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else if (result == undefined || result == null || result == "") {
          console.log("No Blog Found");
          res.send("Not Found");
        } else {
          res.send(result);
        }
    })
}

let viewByAuthor = (req, res) => {
    BlogModel.find({'author': req.params.author}, (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else if (result == undefined || result == null || result == "") {
          console.log("No Blog Found");
          res.send("Not Found");
        } else {
          res.send(result);
        }
    })
}

let editBlog = (req, res) =>{
    let options = req.body;
    console.log(options);
    BlogModel.update({ blogId: req.params.blogId }, options, {
      multi: true
    }).exec((err, result) => {
      if (err) {
        console.log("Error Occured.");
        logger.error(`Error Occured : ${err}`, "Database", 10);
        let apiResponse = response.generate(true, "Error Occured.", 500, null);
        res.send(apiResponse);
      } else if (result == undefined || result == null || result == "") {
               console.log("Blog Not Found.");
               let apiResponse = response.generate(
                 true,
                 "Blog Not Found",
                 404,
                 null
               );
               res.send(apiResponse);
             } else {
               console.log("Blog Edited Successfully");
               let apiResponse = response.generate(
                 false,
                 "Blog Edited Successfully.",
                 200,
                 result
               );
               res.send(apiResponse);
             }
    });
}

let createBlog = (req, res) => {
    var today = Date.now()
    let blogId = shortid.generate()

    let newBlog = new BlogModel({
        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.bodyHtml,
        isPublished: true,
        category: req.body.category,
        author: req.body.author,
        created: time.now(),
        lastModified: time.now()
    })

    let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags!== '') ? req.body.tags.split(',') : []
    newBlog.tags = tags

    newBlog.save((err, result) => {
        if(err){
            console.log(err)
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

let deleteBlog = (req, res) => {
    BlogModel.remove({ 'blogId' : req.params.blogId }, (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else if (result == undefined || result == null || result == "") {
          console.log("No Blog Found");
          res.send("Not Found");
        } else {
          res.send(result);
        }
    })
}

let increaseBlogView = (req, res) => {
    BlogModel.findOne({'blogId' : req.params.blogId }, (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else if (result == undefined || result == null || result == "") {
          console.log("No Blog Found");
          res.send("Not Found");
        } else {
          result.views += 1;
          result.save(function (err, result){
              if(err){
                  console.log(err);
                  res.send(err);
              }else{
                  console.log("Blog Updated Successfully");
                  res.send(result);
              }
          })
        }
    }) 
}

module.exports = {
    getAllBlog: getAllBlog,
    createBlog: createBlog,
    viewByBlogId: viewByBlogId,
    viewByCategory: viewByCategory,
    viewByAuthor: viewByAuthor,
    editBlog: editBlog,
    deleteBlog: deleteBlog,
    increaseBlogView: increaseBlogView
}