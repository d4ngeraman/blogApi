import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogHttpService } from '../blog-http.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  //declare a dummy blog variable here
  public allBlogs;

  constructor(public blogHttpService:BlogHttpService) {
    console.log('Constructor is called');
  }

  ngOnInit(): void {
    console.log('ngOnInit Called');
    //this.allBlogs = this.blogHttpService.getAllBlogs();
    this.allBlogs = this.blogHttpService.getAllBlogs().subscribe(
      data => {
        console.log("Logging Data");
        console.log(data);
        this.allBlogs = data['data'];
      },
      error => {
        console.log("Some Error occured");
        console.log(error.errorMessage);
      }
    )
    console.log(this.allBlogs);
  }
  ngOnDestroy(){ 
    console.log('ngOnDestroy Called');
  }
}
