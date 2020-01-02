import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HttpEvent, HttpRequest, HttpHandler, HttpResponse } from "@angular/common/http";
import { usersMock } from "./user-mocks";
@Injectable({
  providedIn: "root"
})
export class AuthMockService {
  private users: [] = usersMock;
  constructor() {
    console.log("Auth Mock Service Enabled");
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null)
      .pipe(
        mergeMap(() => {
          if (request.url.endsWith(`${environment.apiBaseURL}/oauth/token`) && request.method === "POST") {
            const parameters = request.body ? this.extractParams(request) : {};
            const valid: boolean = this.validateLogin();
            if (valid) {
              return of(
                new HttpResponse({ status: 200, body: this.generateToken() })
              );
            } else {
              return of(
                new HttpResponse({
                  status: 400,
                  statusText: "Bad credentials",
                  body: JSON.stringify({ error: "invalid_grant", error_description: "Bad credentials" })
                })
              );
            }
          }
          return next.handle(request);
        })
      )
      .pipe(materialize())
      .pipe(delay(1000))
      .pipe(dematerialize());
  }

  generateToken(): any {
    return JSON.stringify({
      access_token: "d77276be-2440-4687-b625-3b6bba066deb",
      token_type: "bearer",
      refresh_token: "26aff65e-f5b8-4ab7-a768-fd8b4c9025a4",
      expires_in: 119,
      scope: "write"
    });
  }

  validateLogin(): boolean {
    console.log(this.users);
    return true;
  }

  private extractParams(request: HttpRequest<any>) {
    const pairs = request.body.split("&");
    const result = {};
    pairs.forEach((pair) => {
      pair = pair.split("=");
      result[pair[0]] = decodeURIComponent(pair[1] || "");
    });
    return JSON.parse(JSON.stringify(result));
  }
}
