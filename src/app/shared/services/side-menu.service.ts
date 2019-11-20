import { Injectable } from '@angular/core';

const sideBarMenu = [
  {
    sideBarId: "0",
    sideBarUrl: "/page",
    sideBarName: "Side Menu",
    icon:
      "/blueprint/assets/images/icons/icon_toolshop.png",
    image: "/blueprint/assets/images/icons/tool_shop.png"
  }
];

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {

  constructor() { }

  getSideBarMenu() {
    return sideBarMenu;
  }
}
