import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { TokenInterceptor } from "./http/token-interceptor.service";
import { Provider } from "@angular/core";
import { AuthMockService } from '../mock/auth/auth-mock.service';

/** Http interceptor providers in outside-in order */
const interceptors: Provider[] = [{
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}];
if (environment.mockMode) {
  interceptors.push(
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthMockService,
      multi: true
    }
  );
}
export const httpInterceptorProviders = interceptors;
