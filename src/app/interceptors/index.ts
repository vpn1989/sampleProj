import { Provider } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { TokenInterceptor } from './http/token-interceptor.service';

/** Http interceptor providers in outside-in order */
const interceptors: Provider[] = [{
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}];
if (environment.mockMode) {
  // interceptors.push([]);
}
export const httpInterceptorProviders = interceptors;
