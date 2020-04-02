import { Component, OnInit, OnDestroy } from '@angular/core';
//import route related code here

import { ActivatedRoute, Router } from '@angular/router';
import {BlogService} from '../blog.service';
import { BlogHttpService } from '../blog-http.service';
import { ToastrManager } from "ng6-toastr-notifications";
import {Location} from '@angular/common';

@Component({
  selector: "app-blog-view",
  templateUrl: "./blog-view.component.html",
  styleUrls: ["./blog-view.component.css"],
  providers: [Location]
})
export class BlogViewComponent implements OnInit, OnDestroy {
  //empty Object
  public currentBlog;
  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    public blogService: BlogService,
    public blogHttpService: BlogHttpService,
    private toastr: ToastrManager,
    private location: Location
  ) {
    console.log("Constructor is called");
  }

  ngOnInit(): void {
    console.log("ngOnInit Called");
    //getting the blog id from the route
    let myBlogId = this._route.snapshot.paramMap.get("blogId");
    //calling the function to get the blog with this blogId out of the overall
    this.blogHttpService.getSingleBlogInformation(myBlogId).subscribe(
      data => {
        console.log(data);
        this.currentBlog = data;
      },
      error => {
        console.log("Some Error Occured");
        console.log(error.errorMessage);
      }
    );
  }

  //delete blog

  public deleteThisBlog(): any {
    this.blogHttpService.deleteBlog(this.currentBlog.blogId).subscribe(
      data => {
        console.log(data);
        this.toastr.successToastr("Blog Deleted Successfully", "success");
        setTimeout(() => {
          this.router.navigate(["/home"]);
        }, 1000);
      },
      error => {
        console.log("Some error");
        console.log(error.errorMessage);
        this.toastr.errorToastr("THIS IS ERROR", "error");
      }
    );
  }


  public goBackToPreviousPage(): any{
    this.location.back();
  }

  ngOnDestroy() {
    console.log("OnDestroy Component Called");
  }
}
