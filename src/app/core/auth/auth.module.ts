import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from './shared/token-interceptor.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, AuthRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {}
