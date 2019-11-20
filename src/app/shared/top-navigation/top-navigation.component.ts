import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./../../core/auth/shared/authentication.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-top-navigation",
  templateUrl: "./top-navigation.component.html",
  styleUrls: ["./top-navigation.component.scss"]
})
export class TopNavigationComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
  }
}
