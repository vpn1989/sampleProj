import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyListRoutingModule } from './company-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyListComponent } from './company-list.component';

@NgModule({
  declarations: [CompanyListComponent],
  imports: [
    CommonModule,
    SharedModule,
    CompanyListRoutingModule
  ]
})
export class CompanyListModule { }
