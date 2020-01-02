import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationListRoutingModule } from './application-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApplicationListComponent } from './application-list.component';


@NgModule({
  declarations: [ApplicationListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApplicationListRoutingModule
  ]
})
export class ApplicationListModule { }
