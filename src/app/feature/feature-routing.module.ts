import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RequestsComponent } from "./requests/requests.component";
import { SubscriptionsComponent } from "./subscriptions/subscriptions.component";
import { VendorsComponent } from "./vendors/vendors.component";
import { PlansComponent } from "./plans/plans.component";
import { CompanyComponent } from "./company/company.component";
import { AccountRequestComponent } from "./account-request/account-request.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full"
  },
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "category",
    loadChildren: () =>
      import("./category/category.module").then(m => m.CategoryModule)
  },
  {
    path: "industry",
    // component: IndustryComponent,
    loadChildren: () =>
      import("./industry/industry.module").then(m => m.IndustryModule)
  },
  {
    path: "applications",
    loadChildren: () =>
      import("./applications/applications.module").then(
        m => m.ApplicationsModule
      )
  },
  {
    path: "plans",
    component: PlansComponent,
    loadChildren: () => import("./plans/plans.module").then(m => m.PlansModule)
  },
  {
    path: "requests",
    component: RequestsComponent,
    loadChildren: () =>
      import("./requests/requests.module").then(m => m.RequestsModule)
  },
  {
    path: "subscriptions",
    component: SubscriptionsComponent,
    loadChildren: () =>
      import("./subscriptions/subscriptions.module").then(
        m => m.SubscriptionsModule
      )
  },
  {
    path: "vendors",
    component: VendorsComponent,
    loadChildren: () =>
      import("./vendors/vendors.module").then(m => m.VendorsModule)
  },
  {
    path: "company",
    loadChildren: () =>
      import("./company/company.module").then(m => m.CompanyModule)
  },
  {
    path: "account-request",
    component: AccountRequestComponent,
    loadChildren: () =>
      import("./account-request/account-request.module").then(m => m.AccountRequestModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
