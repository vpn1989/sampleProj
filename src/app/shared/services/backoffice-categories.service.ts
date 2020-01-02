import { Injectable } from "@angular/core";
const backofficeCategories = [
  {
    categoryID: "0",
    categoryURL: "/industry",
    categoryName: "Industry",
    icon:
      "/dam/public/backoffice/assets/images/icons/svg/industry-24x24.svg",
    image: "/dam/public/backoffice/assets/images/icons/svg/industry.svg"
  },
  {
    categoryID: "1",
    categoryURL: "/category",
    categoryName: "Category",
    icon:
      "/dam/public/backoffice/assets/images/icons/svg/category-24x24.svg",
    image: "/dam/public/backoffice/assets/images/icons/svg/category.svg"
  },
  {
    categoryID: "2",
    categoryURL: "/applications",
    categoryName: "Applications",
    icon:
      "/dam/public/backoffice/assets/images/icons/svg/applications-24x24.svg",
    image:
      "/dam/public/backoffice/assets/images/icons/svg/applications.svg"
  },
  /*{
    categoryID: "3",
    categoryURL: "/plans",
    categoryName: "Plans",
    icon:
      "/dam/public/backoffice/assets/images/icons/icon_manufacturing.png",
    image:
      "/dam/public/backoffice/assets/images/icons/svg/plans.svg"
  },*/
  {
    categoryID: "4",
    categoryURL: "/company",
    categoryName: "Company",
    icon:
      "/dam/public/backoffice/assets/images/icons/svg/company-24x24.svg",
    image:
      "/dam/public/backoffice/assets/images/icons/svg/company.svg"
  },
  {
    categoryID: "5",
    categoryURL: "/vendors",
    categoryName: "Vendors",
    icon:
      "/dam/public/backoffice/assets/images/icons/svg/vendors-24x24.svg",
    image:
      "/dam/public/backoffice/assets/images/icons/svg/vendors.svg"
  },
  {
    categoryID: "6",
    categoryURL: "/requests",
    categoryName: "Subscription Request",
    icon:
      "/dam/public/backoffice/assets/images/icons/svg/subscription_request-24x24.svg",
    image:
      "/dam/public/backoffice/assets/images/icons/svg/subscription_request.svg"
  },
  {
    categoryID: "7",
    categoryURL: "/subscriptions",
    categoryName: "Subscriptions",
    icon:
      "/dam/public/backoffice/assets/images/icons/svg/subscriptions-24x24.svg",
    image: "/dam/public/backoffice/assets/images/icons/svg/subscriptions.svg"
  },
  {
    categoryID: "8",
    categoryURL: "/account-request",
    categoryName: "Account Requests",
    icon:
      "/dam/public/backoffice/assets/images/icons/svg/subscription_request-24x24.svg",
    image:
      "/dam/public/backoffice/assets/images/icons/svg/subscription_request.svg"
  }
];

@Injectable({
  providedIn: "root"
})
export class BackofficeCategoriesService {
  constructor() { }

  getBackofficeCategories() {
    return backofficeCategories;
  }
}
