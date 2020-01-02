import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CompanyComponent } from './company.component';

const routes: Routes = [
  {
    path: "",
    component: CompanyComponent,
    children: [
      {
        path: "list",
        loadChildren: () =>
          import("./company-list/company-list.module").then(m => m.CompanyListModule)
      },
      {
        path: "create",
        loadChildren: () =>
          import("./company-form/company-form.module").then(m => m.CompanyFormModule)
      },
      {
        path: "update/:id",
        loadChildren: () =>
          import("./company-form/company-form.module").then(m => m.CompanyFormModule)
      },
      {
        path: "account-request/:id",
        loadChildren: () =>
        import("./company-form/company-form.module").then(m => m.CompanyFormModule)
      },
      {
        path: "",
        redirectTo: "/company/list"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
