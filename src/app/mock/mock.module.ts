import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthMockService } from "./auth/auth-mock.service";
import { IndustriesMockService } from './shared/industries/industries-mock.service';
import { CategoriesMockService } from './shared/categories/categories-mock.service';
import { AccountRequestMockService } from './shared/account-request/account-request-mock.service';
import { CompaniesMockService } from './shared/companies/companies-mock.service';
import { PlansMockService } from './shared/plans/plans-mock.service';
import { ApplicationsMockService } from './shared/applications/applications-mock.service';
import { SubscriptionRequestMockService } from './shared/subscription-request/subscription-request-mock.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthMockService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SubscriptionRequestMockService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApplicationsMockService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IndustriesMockService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CategoriesMockService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PlansMockService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CompaniesMockService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccountRequestMockService,
      multi: true
    }
  ]
})
export class MockModule { }
