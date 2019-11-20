import { Component, OnInit } from "@angular/core";
import { SideMenuService } from "../services/side-menu.service";

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-navigation.component.html",
  styleUrls: ["./side-navigation.component.scss"]
})
export class SideNavigationComponent implements OnInit {
  sideBars: any[];
  constructor(
    private sideMenuService: SideMenuService
  ) {}

  ngOnInit() {
    this.sideBars = this.sideMenuService.getSideBarMenu();
  }
}
