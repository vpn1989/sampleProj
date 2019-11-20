import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AuthModule } from "./auth/auth.module";
import { environment } from "src/environments/environment";
import { LoggerModule } from './logger/logger.module';

@NgModule({
  imports: [
    HttpClientModule,
    AuthModule,
    environment.production ? [] : LoggerModule
  ]
})
export class CoreModule {}