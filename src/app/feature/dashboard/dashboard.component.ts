import { Component, OnInit } from "@angular/core";
import { BackofficeCategoriesService } from "src/app/shared/services/backoffice-categories.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from 'src/app/core/auth/shared/authentication.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  categories: any[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private backofficeCategoriesService: BackofficeCategoriesService
  ) {}

  ngOnInit() {
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigate(["/auth"]);
    }
    this.categories = this.backofficeCategoriesService.getBackofficeCategories();
  }

  routToURL(url: string) {
    this.router.navigate([url]);
  }
}
