import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationFormRoutingModule } from './application-form-routing.module';
import { ApplicationFormComponent } from './application-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { RoleFormComponent } from '../role-form/role-form.component';

@NgModule({
  declarations: [ApplicationFormComponent, RoleFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    CKEditorModule,
    ApplicationFormRoutingModule
  ]
})
export class ApplicationFormModule { }
