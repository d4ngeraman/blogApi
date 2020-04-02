import { Component, OnInit } from '@angular/core';
import {BlogService} from '../blog.service';
import {Location} from '@angular/common';
import {BlogHttpService} from '../blog-http.service';
import {ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: "app-blog-edit",
  templateUrl: "./blog-edit.component.html",
  styleUrls: ["./blog-edit.component.css"]
})
export class BlogEditComponent implements OnInit {
  public currentBlog;
  public title = "";
  public possibleCategories = ["Comedy", "Sports", "Fun", "Action"];
  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    public blogService: BlogService,
    private blogHttpService: BlogHttpService,
    private toastr: ToastrManager
  ) {}

  ngOnInit(): void {
    console.log("ngOnInit Called");
    //getting the blog id from the route
    let myBlogId = this._route.snapshot.paramMap.get("blogId");
    console.log(myBlogId);
    //calling the function to get the blog with this blogId out of the overall
    this.blogHttpService.getSingleBlogInformation(myBlogId).subscribe(
      data => {
        console.log(data);
        this.currentBlog = data;
        console.log("Current Blog is");
        console.log(this.currentBlog);
      },
      error => {
        console.log("Some Error Occured");
        console.log(error.errorMessage);
      }
    );
  }

  public editThisBlog(): any {
    this.blogHttpService
      .editBlog(this.currentBlog.blogId, this.currentBlog)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.successToastr("Blog Edited Successfully", "Success!");
          setTimeout(() => {
            this.router.navigate(["/blog", this.currentBlog.blogId]);
          }, 1000);
        },
        error => {
          console.log("error");
          console.log(error.errorMessage);
        }
      );
  }
}
