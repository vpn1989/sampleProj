import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-applications",
  templateUrl: "./applications.component.html",
  styleUrls: ["./applications.component.scss"]
})
export class ApplicationsComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}

  goToActiveComponent(url) {
    this.router.navigate([url]);
  }
}
