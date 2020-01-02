import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationFormComponent } from './application-form.component';


const routes: Routes = [{
  path: "",
  component: ApplicationFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationFormRoutingModule { }
