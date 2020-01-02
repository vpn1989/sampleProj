import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError, ReplaySubject } from "rxjs";
import { TokenResponse } from "./models/token-response";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { catchError, map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private static PASSWORD_GRANT_TYPE = "password";
  private static REFRESH_TOKEN_GRANT_TYPE = "refresh_token";
  static TOKEN_IDENTIFIER = "token";
  private clientId = "iapps-backoffice-ui-client";
  private clientSecret = "secret_client_password";
  public tokenSubject: BehaviorSubject<TokenResponse>;
  public refreshTokenSubject: ReplaySubject<TokenResponse> = new ReplaySubject<TokenResponse>();
  constructor(private http: HttpClient, private router: Router) {
    try {
      this.tokenSubject = new BehaviorSubject<TokenResponse>(JSON.parse(localStorage.getItem(AuthenticationService.TOKEN_IDENTIFIER)));
    } catch (exception) {
      this.tokenSubject = new BehaviorSubject<TokenResponse>(null);
      // console.log(exception);
    }
  }


  login(data): Observable<TokenResponse> {
    const params = new URLSearchParams();
    params.append("username", data.username);
    params.append("password", data.password);
    params.append("grant_type", AuthenticationService.PASSWORD_GRANT_TYPE);
    params.append("client_id", this.clientId);
    const headers = new HttpHeaders({
      "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
      Authorization: "Basic " + btoa(this.clientId + ":" + this.clientSecret)
    });
    const options = { headers };
    return this.http.post<TokenResponse>(`${environment.apiBaseURL}/oauth/token`, params.toString(), options).
      pipe(
        map((token) => {
          this.storeToken(token);
          return token;
        }),
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  logout() {
    this.clearToken();
    this.router.navigate(["/auth"]);
    // TODO : perform token revokation at server side
  }

  private storeToken(token) {
    localStorage.setItem(AuthenticationService.TOKEN_IDENTIFIER, JSON.stringify(token));
    this.tokenSubject.next(token);
    return token;
  }

  private clearToken() {
    this.tokenSubject.next(null);
    localStorage.removeItem(AuthenticationService.TOKEN_IDENTIFIER);
  }

  refreshToken(): ReplaySubject<TokenResponse> {
    const params = new URLSearchParams();
    params.append("refresh_token", this.getRefreshToken());
    params.append("grant_type", AuthenticationService.REFRESH_TOKEN_GRANT_TYPE);
    const headers = new HttpHeaders({
      "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
      Authorization: "Basic " + btoa(this.clientId + ":" + this.clientSecret)
    });
    const options = { headers };
    this.http.post(`${environment.apiBaseURL}/oauth/token`, params.toString(), options).
      subscribe({
        next: (token: TokenResponse) => {
          this.storeToken(token);
          this.refreshTokenSubject.next(token);
        }, error: (err) => {
          this.logout();
          this.refreshTokenSubject.error(err);
        }
      });
    return this.refreshTokenSubject;
  }

  getRefreshToken() {
    const token = localStorage.getItem(AuthenticationService.TOKEN_IDENTIFIER);
    if (token) {
      return JSON.parse(token).refresh_token;
    }
    return "";
  }

  getAcessToken() {
    const token = localStorage.getItem(AuthenticationService.TOKEN_IDENTIFIER);
    if (token) {
      return JSON.parse(token).access_token;
    }
    return "";
  }

  isLoggedIn(): boolean {
    if (this.tokenSubject.value !== null) {
      return true;
    }
    return false;
  }
}
