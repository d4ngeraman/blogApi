import { Injectable } from '@angular/core';
//importign http client  to make the  requests 
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import observable realted code
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Injectable({
  providedIn: "root"
})
export class BlogHttpService {
  public allBlogs;
  public currentBlog;
  public baseUrl = "http://localhost:3000/api/v1/blogs";
  private authToken =
    "d4ngeraman";

  constructor(private _http: HttpClient) {
    console.log("Blog Http service called");
  }

  //exeption error
  private handleError(err: HttpErrorResponse) {
    console.log("Handle Error Http Calls");
    console.log(err.message);
    return Observable.throw(err.message);
  }

  //method to return all the blogs
  public getAllBlogs(): any {
    let myResponse = this._http.get(
      this.baseUrl + "/all?authToken=" + this.authToken
    );
    console.log(myResponse);
    return myResponse;
  }
  //method to get a particualar clog
  public getSingleBlogInformation(currentBlogId): any {
    let myResponse = this._http.get(
      this.baseUrl +
        "/view" +
        "/" +
        currentBlogId +
        "?authToken=" +
        this.authToken
    );
    return myResponse;
  }

  public createBlog(blogData): any {
    let myResponse = this._http.post(
      this.baseUrl + "/create" + "/" + "?authToken=" + this.authToken,
      blogData
    );
    return myResponse;
  }

  public deleteBlog(blogId): any {
    let data = {};
    let myResponse = this._http.post(
      this.baseUrl + "/" + blogId + "/delete" + "?authToken=" + this.authToken,
      data
    );
    return myResponse;
  }

  public editBlog(blogId, blogData): any {
    let myResponse = this._http.put(
      this.baseUrl + "/" + blogId + "/edit" + "?authToken=" + this.authToken,
      blogData
    );
    return myResponse;
  }
}
