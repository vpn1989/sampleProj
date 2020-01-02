import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CompanyRoutingModule } from "./company-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { FeatureSharedModule } from '../shared/feature-shared.module';
import { CompanyComponent } from './company.component';

@NgModule({
  declarations: [CompanyComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule,
    FeatureSharedModule
  ]
})
export class CompanyModule {}
