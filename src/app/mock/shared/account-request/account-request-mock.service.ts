import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AccountRequest } from 'src/app/feature/shared/models/account-request';
import { accountRequestMock } from "./account-request-mock";
import { requestStatusMock } from "../request-status-mock";
import { RequestStatus } from 'src/app/feature/shared/models/request-status';

@Injectable({
  providedIn: 'root'
})
export class AccountRequestMockService {
  private accountRequest: AccountRequest[] = accountRequestMock;
  private requestStatus: RequestStatus[] = requestStatusMock;
  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return of(null)
      .pipe(
        mergeMap(() => {
          if (
            request.url.match(`^${environment.apiBaseURL}/account-request`) &&
            request.method === "GET"
          ) {
            // console.log("--- Serving request List ---", request);
            return this.serveAccountRequest(request);
          }

          if (
            request.url.match(`^${environment.apiBaseURL}/request-status`) && 
            request.method === "GET"
          ) {
            return this.serveRequestStatus();
          }

          if (request.url.match(`^${environment.apiBaseURL}/accountRequest/updateStatus`)){
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

  private updateStatus(dataRequest:HttpRequest<AccountRequest>){
    return of(new HttpResponse({status: 200, body: {} }));
  }

  private getParam(params, parameterName, defaultValue) {
    let retunValue = params ? params.get(parameterName) : defaultValue;
    if (retunValue == null || retunValue === undefined) {
      retunValue = defaultValue;
    }
    return retunValue;
  }

  private serveAccountRequest(request: HttpRequest<AccountRequest>) {
    const pageNumber: number = this.getParam(request.params, "pageNumber", 0);
    const pageSize: number = this.getParam(request.params, "pageSize", 0);

    const requestResult: any = { ...this.accountRequest };

    if (pageNumber !== 0 && pageSize !== 0) {
      const first = 0;
      const last = pageSize - 1;
      if (pageNumber > 1) {
        requestResult.Requests = requestResult.Requests.slice(
          first + (pageNumber - 1) * pageSize,
          last + (pageNumber - 1) * pageSize + 1
        );
      } else {
        requestResult.Requests = requestResult.Requests.slice(
          first,
          last + 1
        );
      }
    }

    return of(new HttpResponse({ status: 200, body: requestResult }));
  }

  private serveRequestStatus() {
    const requestStatusResult: any = { ...this.requestStatus };

    return of(new HttpResponse({ status: 200, body: requestStatusResult }));
  }
}
