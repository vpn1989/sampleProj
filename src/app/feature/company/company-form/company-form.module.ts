import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyFormComponent } from './company-form.component';
import { CompanyFormRoutingModule } from './company-form-routing.module';

@NgModule({
  declarations: [CompanyFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    CompanyFormRoutingModule
  ]
})

export class CompanyFormModule { }
