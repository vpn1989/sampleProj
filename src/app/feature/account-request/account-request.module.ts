import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AccountRequestRoutingModule } from './account-request-routing.module';
import { RequestListComponent } from './request-list/request-list.component';


@NgModule({
  declarations: [RequestListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AccountRequestRoutingModule
  ]
})
export class AccountRequestModule { }
