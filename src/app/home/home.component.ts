import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/auth/shared/authentication.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private router: Router,
              private authService: AuthenticationService) {}

  ngOnInit() {
    const ELEMENT_SIDEBAR = document.querySelector("iapps-sidebar");
    const ELEMENT_HEADER = document.querySelector("iapps-header");
    ELEMENT_SIDEBAR.addEventListener(
      "menuItemClicked",
      this.changeMenu.bind(this)
    );
    ELEMENT_HEADER.addEventListener(
      "selectedMenuChoice",
      this.goToUrl.bind(this)
    );
  }

  changeMenu(event): void {
    this.router.navigate([event.detail.url]);
  }

  goToUrl(event): void {
    if (event.detail.menu.url.match(`/auth`)) {
      this.authService.logout();
    } else {
      this.router.navigate([event.detail.menu.url]);
    }
  }

}
