import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ApplicationsComponent } from "./applications.component";

const routes: Routes = [
  {
    path: "",
    component: ApplicationsComponent,
    children: [
      {
        path: "list",
        loadChildren: () =>
          import("./application-list/application-list.module").then(m => m.ApplicationListModule)
      },
      {
        path: "create",
        loadChildren: () =>
          import("./application-form/application-form.module").then(m => m.ApplicationFormModule)
      },
      {
        path: "update/:id",
        loadChildren: () =>
          import("./application-form/application-form.module").then(m => m.ApplicationFormModule)
      },
      {
        path: "",
        redirectTo: "/applications/list"
      },
    ]
  }
] as Routes;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule {}
