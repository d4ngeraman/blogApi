import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
//router module
import { RouterModule, Routes } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { BlogViewComponent } from "./blog-view/blog-view.component";
import { BlogEditComponent } from "./blog-edit/blog-edit.component";
import { AboutComponent } from "./about/about.component";
import { BlogCreateComponent } from "./blog-create/blog-create.component";
import { NotfoundComponent } from "./notfound/notfound.component";
//import blog service
import { BlogService } from "./blog.service";
import {BlogHttpService} from "./blog-http.service";
import { FormsModule } from '@angular/forms';

import { ToastrModule } from "ng6-toastr-notifications";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogViewComponent,
    BlogEditComponent,
    BlogCreateComponent,
    AboutComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: "home", component: HomeComponent },
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "about", component: AboutComponent },
      { path: "create", component: BlogCreateComponent },
      { path: "edit/:blogId", component: BlogEditComponent },
      { path: "blog/:blogId", component: BlogViewComponent },
      { path: "**", component: NotfoundComponent }
    ])
  ],
  providers: [BlogService, BlogHttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}