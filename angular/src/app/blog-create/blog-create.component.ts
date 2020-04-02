import { Component, OnInit } from '@angular/core';
import {BlogHttpService} from '../blog-http.service';
import {ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from "ng6-toastr-notifications";
 
@Component({
  selector: "app-blog-create",
  templateUrl: "./blog-create.component.html",
  styleUrls: ["./blog-create.component.css"]
})
export class BlogCreateComponent implements OnInit {
  constructor(
    private blogHttpService: BlogHttpService,
    private _route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrManager
  ) {}

  public blogTitle: any;
  public blogBodyHtml: any;
  public blogDescription: any;
  public blogCategory: string;
  public possibleCategories = ["Comedy", "Sports", "Fun", "Action"];
  private authToken = "d4ngeraman";

  ngOnInit(): void {}
  public createBlog(): any {
    let blogData = {
      title: this.blogTitle,
      description: this.blogDescription,
      bodyHtml: this.blogBodyHtml,
      category: this.blogCategory,
      author: this.authToken
    };
    console.log(blogData);
    this.blogHttpService.createBlog(blogData).subscribe(
      data => {
        console.log("Blog created");
        console.log(data);
        this.toastr.successToastr("Blog Posted Successfully", "Success!");
        setTimeout(() => {
          this.router.navigate(["/blog", data.blogId]);
        }, 1000);
      },
      error => {
        console.log("Some Error Occured");
        console.log(error.errorMessage);
        alert("Some Error Occured");
      }
    );
  }
}
