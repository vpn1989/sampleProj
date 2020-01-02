import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NotFoundComponent } from "./shared/not-found/not-found.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./core/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "",
    component: HomeComponent,
    loadChildren: () => import("./feature/feature.module").then(m => m.FeatureModule)
  },
  { path: "404", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
