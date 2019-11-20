import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { filter, take, switchMap, catchError, retryWhen, tap, delay } from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";


@Injectable({
    providedIn: "root"
})
export class TokenInterceptor implements HttpInterceptor {
    private refreshTokenInProgress = false;
    // Refresh Token Subject tracks the current token, or is null if no token is currently
    // available (e.g. refresh pending).
    constructor(private authService: AuthenticationService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (
            (!request.url.includes("token")) &&
            (!request.url.includes("assets")) &&
            (this.authService.isLoggedIn())
        ) {
            // console.log(`The request ${request.url} needs to be add token`);
            return next.handle(this.addAcessToken(request)).pipe(catchError((err, caught) => {
                console.log(err, caught);
                if (err instanceof HttpErrorResponse) {
                    console.log(err.status);
                    if (err.status === 401) {
                        return this.handle401Error(request, next);
                    }
                    if (err.status === 400) {
                        return this.handle400Error(err);
                    }
                }
                return throwError(err);
            }));
        } else {
            return next.handle(request);
        }
    }
    handle400Error(error: HttpErrorResponse): Observable<never> {
        // console.log("Handling 400 (Bad Request) Error");
        if (error && error.status === 400 && error.error && error.error.error === "invalid_grant") {
            // console.log("Invalid grant found so loging out the user");
            // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
            this.authService.logout();
        }
        return throwError(error);
    }


    private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log("Handling 401 error");
        if (this.refreshTokenInProgress) {
            // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
            // – which means the new token is ready and we can retry the request again
            // console.log(`A Refresh token request is already in progress so adding Request (${request.url}) in queue`);
            return this.authService.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap(() => {
                    console.log(`Processing ${request.url} since refresh token request is completed`);
                    this.refreshTokenInProgress = false;
                    return next.handle(this.addAcessToken(request));
                })
            );
        } else {
            // console.log(`Handling 401 of request (${request.url}) error by refreshing token`);
            this.refreshTokenInProgress = true;
            // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
            return this.authService.refreshToken().pipe(
                filter(result => result !== null),
                take(1),
                switchMap(() => {
                    // console.log(`Refresh token request completed so processing ${request.url}`);
                    return next.handle(this.addAcessToken(request));
                }));
        }
    }

    private addAcessToken(request) {
        const accessToken = this.authService.getAcessToken();
        if (accessToken) {
            // console.log(`Adding access token (${accessToken}) to the request `, request);
            return request.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        }
    }
}
