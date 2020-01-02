import { Component, OnInit } from "@angular/core";
import { BackofficeCategoriesService } from "../services/backoffice-categories.service";

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-navigation.component.html",
  styleUrls: ["./side-navigation.component.scss"]
})
export class SideNavigationComponent implements OnInit {
  categories: any[];
  constructor(
    private backofficeCategoriesService: BackofficeCategoriesService
  ) {}

  ngOnInit() {
    this.categories = this.backofficeCategoriesService.getBackofficeCategories();
  }
}
