import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { AuthenticationService } from "../../core/auth/shared/authentication.service";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { catchError, switchMap, filter, take, tap } from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private isRefreshing = false;

    constructor(private authService: AuthenticationService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        console.log(request.url);
        if (!request.url.includes("token") && !request.url.includes("assets") && this.authService.isLoggedIn()) {
            console.log(request.url);
            const accessToken = this.authService.getAcessToken();
            if (accessToken) {
                request = this.addAcessToken(request, accessToken);
            }
        }
        return next.handle(request).pipe(
            tap(
                () => {},
                (error: any) => {
                    if (error instanceof HttpErrorResponse) {
                        switch ((error as HttpErrorResponse).status) {
                            case 400:
                                return this.handle400Error(error);
                            case 401:
                                return this.handle401Error(request, next);
                            default:
                                return throwError(error);
                        }
                    } else {
                        return throwError(error);
                    }
                }
            )
        );
    }
    handle400Error(error: HttpErrorResponse): void {
        if (error && error.status === 400 && error.error && error.error.error === "invalid_grant") {
            // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
            return this.authService.logout();
        }
        throwError(error);
    }


    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            return this.authService.refreshToken().subscribe((token: any) => {
                this.isRefreshing = false;
                const accessToken = token.access_token;
                return next.handle(this.addAcessToken(request, accessToken));
            }, () => {
                // If there is an exception calling 'refreshToken', bad news so logout.
                return this.authService.logout();
            });

        } else {
            if (!request.url.includes("token")) {
                return this.authService.tokenSubject.pipe(
                    filter(token => token != null),
                    take(1),
                    switchMap(token => {
                        return next.handle(this.addAcessToken(request, token.access_token));
                    }));
            } else {
                return next.handle(request);
            }
        }
    }

    private addAcessToken(request, accessToken) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
}
