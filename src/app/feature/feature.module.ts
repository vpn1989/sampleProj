import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";

import { FeatureRoutingModule } from "./feature-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RequestsComponent } from "./requests/requests.component";
import { SubscriptionsComponent } from "./subscriptions/subscriptions.component";
import { VendorsComponent } from "./vendors/vendors.component";
import { PlansComponent } from "./plans/plans.component";
import { DataService } from "./shared/services/data-service.service";
import { AccountRequestComponent } from "./account-request/account-request.component";
import { FeatureSharedModule } from "./shared/feature-shared.module";

@NgModule({
  declarations: [
    DashboardComponent,
    // IndustryComponent,
    PlansComponent,
    RequestsComponent,
    SubscriptionsComponent,
    VendorsComponent,
    AccountRequestComponent
  ],
  imports: [CommonModule, SharedModule, FeatureSharedModule, FeatureRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [DataService]
})
export class FeatureModule {}
