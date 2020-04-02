import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class BlogService {
  public allBlogs = [
    {
      blogId: "1",
      lastModified: "2020-02-17",
      created: "2020-02-16",
      tags: [],
      author: "Aman",
      category: "Development",
      isPublished: true,
      views: 0,
      bodyHtml: "This is the HTML Body",
      description: "This is the body 1 description",
      title: "This is the title 1"
    },
    {
      blogId: "2",
      lastModified: "2020-02-17",
      created: "2020-02-16",
      tags: [],
      author: "Aman Gupta",
      category: "Testing",
      isPublished: true,
      views: 0,
      bodyHtml: "This is the HTML Body 2",
      description:
        "This is the body 2 description its in the middle please check",
      title: "This is the title 2"
    },
    {
      blogId: "3",
      lastModified: "2020-02-17",
      created: "2020-02-16",
      tags: [],
      author: "A",
      category: "WEB",
      isPublished: true,
      views: 0,
      bodyHtml: "This is the HTML Body 3",
      description: "This is the body 3 description",
      title: "This is the title 3"
    }
  ];

  public currentBlog;

  constructor() {
    console.log("Service Constructor is called");
  }
  //method to return all the blogs
  public getAllBlogs(): any {
    return this.allBlogs;
  }
//method to get a particualar clog
  public getSingleBlogInformation(currentBlogId): any {
    for (let blog of this.allBlogs) {
      if (blog.blogId == currentBlogId) {
        this.currentBlog = blog;
      }
    }
    console.log(this.currentBlog);
    return this.currentBlog;
  }
}
