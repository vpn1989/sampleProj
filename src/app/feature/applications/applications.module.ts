import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { ApplicationsRoutingModule } from "./applications-routing.module";
import { ApplicationsComponent } from "./applications.component";
import { FeatureSharedModule } from "../shared/feature-shared.module";

@NgModule({
  declarations: [ApplicationsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FeatureSharedModule,
    FormsModule,
    ApplicationsRoutingModule
  ]
})
export class ApplicationsModule {}
