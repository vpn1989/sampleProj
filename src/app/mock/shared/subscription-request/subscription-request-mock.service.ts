import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { SubscriptionRequest } from "../../../feature/shared/models/subscription-request";
import { subscriptionRequestMock } from "./subscription-request-mock";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionRequestMockService {

  private subscription: SubscriptionRequest[] = subscriptionRequestMock;

  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return of(null)
      .pipe(
        mergeMap(() => {
          if (
            request.url.match(`^${environment.apiBaseURL}/subscription/pending`) &&
            request.method === "GET"
          ) {
            return this.serveSubscriptionRequest(request);
          }

          if (request.url.match(`^${environment.apiBaseURL}/subscription/updateStatus`)) {
            if (request.method === "POST") {
              return this.updateStatus(request);
            }
          }
          return next.handle(request);
        })
      )
      .pipe(materialize())
      .pipe(delay(100))
      .pipe(dematerialize());
  }

  private updateStatus(dataRequest: HttpRequest<any>) {
    return of(new HttpResponse({ status: 200, body: {} }));
  }

  private serveSubscriptionRequest(request: HttpRequest<SubscriptionRequest>) {
    const companySearchKey: string = this.getParam(request.params, "CompanySearchKey", "");
    const pageNumber: number = this.getParam(request.params, "PageNumber", 0);
    const pageSize: number = this.getParam(request.params, "PageSize", 0);

    const subscriptionResult: any = { ...this.subscription };

    if (companySearchKey !== "") {
      subscriptionResult.PendingRequests = subscriptionResult.PendingRequests.filter(
        (apps: any) =>
          apps.PlanCode.toLowerCase().indexOf(companySearchKey.toLowerCase()) > -1
      );
    }

    if (pageNumber !== 0 && pageSize !== 0) {
      const first = 0;
      const last = pageSize - 1;
      if (pageNumber > 1) {
        subscriptionResult.PendingRequests = subscriptionResult.PendingRequests.slice(
          first + (pageNumber - 1) * pageSize,
          last + (pageNumber - 1) * pageSize + 1
        );
      } else {
        subscriptionResult.PendingRequests = subscriptionResult.PendingRequests.slice(
          first,
          last + 1
        );
      }
    }

    // console.log("--- subscriptionResult ---", subscriptionResult);
    // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
    return of(new HttpResponse({ status: 200, body: subscriptionResult }));
  }

  private getParam(params, parameterName, defaultValue) {
    let returnValue = params ? params.get(parameterName) : defaultValue;
    if (returnValue == null || returnValue === undefined) {
      returnValue = defaultValue;
    }
    return returnValue;
  }
}
