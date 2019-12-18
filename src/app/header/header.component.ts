import { BGROUTES } from "./header-bg.config";
import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  bgImgName = "1.jpg";
  constructor(private router: Router) {
    this.router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
        const bgRoute = BGROUTES.find(elem => elem.path === route.url);
        if (bgRoute) {
          this.bgImgName = bgRoute.img;
        } else {
          this.bgImgName = "1.jpg";
        }
      }
    });
  }

  ngOnInit() {}

  teste() {
    this.router.navigate(["/"]);
  }
}
