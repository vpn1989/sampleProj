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
import { Company } from "../../../feature/shared/models/company";
import { companiesMock } from "./companies-mock";
import { DbServerData } from 'src/app/feature/shared/models/db-server-data';
import { dbServerDataMock } from "../db-server-data-mock";
import { accountRequestDetailsMock } from "./account-request-details-mock";
import { Account } from 'src/app/feature/shared/models/account';

@Injectable({
  providedIn: "root"
})
export class CompaniesMockService {
  private companyDBServers: DbServerData[] = dbServerDataMock;
  private company: Company[] = companiesMock;
  private account: Account[] = accountRequestDetailsMock;

  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return of(null)
      .pipe(
        mergeMap(() => {
          if (
            request.url.match(`^${environment.apiBaseURL}/company/companyDBServers`) &&
            request.method === "GET") {

            return this.serveCompanyDBServerData(request);
          }

          if (
            request.url.match(`^${environment.apiBaseURL}/company/updateStatus`) &&
            request.method === "POST") {

            // console.log("--- Serving Application List ---");
            return this.serveStatusChangeRequest(request);
          }

          if (request.url.match(`^${environment.apiBaseURL}/company`) &&
            request.method === "GET") {

            // console.log("--- Serving Application List ---");
            return this.serveCompaniesRequest(request);
          }

          if(request.url.match(`^${environment.apiBaseURL}/account`) && request.method === "POST") {
            return this.serveAccountRequest(request);
          }

          return next.handle(request);
        })
      )
      .pipe(materialize())
      .pipe(delay(1000))
      .pipe(dematerialize());
  }

  private getParam(params, parameterName, defaultValue) {
    let retunValue = params ? params.get(parameterName) : defaultValue;
    if (retunValue == null || retunValue === undefined) {
      retunValue = defaultValue;
    }
    return retunValue;
  }

  private serveStatusChangeRequest(request: HttpRequest<any>) {
    return of(new HttpResponse({ status: 200, body: {} }));
  }

  private serveCompaniesRequest(request: HttpRequest<Company>) {

    const companyId: number = this.getParam(request.params, "companyId", 0);
    const pageNumber: number = this.getParam(request.params, "pageNumber", 0);
    const pageSize: number = this.getParam(request.params, "pageSize", 0);

    const companyResult: any = { ...this.company };
    console.log(
      "--- Serving company List3 ---",
      companyResult,
      this.company
    );

    if (companyId !== 0) {
      companyResult.Companies = companyResult.Companies.filter(
        (apps: any) => apps.CompanyID === companyId
      );
    }

    if (pageNumber !== 0 && pageSize !== 0) {
      const first = 0;
      const last = pageSize - 1;
      // console.log("page==> ",pageNumber, pageSize, (first+((pageNumber-1)*pageSize)), (last+((pageNumber-1)*pageSize)));
      if (pageNumber > 1) {
        companyResult.Companies = companyResult.Companies.slice(
          first + (pageNumber - 1) * pageSize,
          last + (pageNumber - 1) * pageSize + 1
        );
      } else {
        companyResult.Companies = companyResult.Companies.slice(
          first,
          last + 1
        );
      }
    }

    console.log("--- HttpResponse ---", request, companyResult);

    // console.log("--- application ---", applicationResult);
    // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
    return of(new HttpResponse({ status: 200, body: companyResult }));

  }

  private serveAccountRequest(request:HttpRequest<Account>){
    const accountResult: any = { ...this.account };
    return of(new HttpResponse({ status: 200, body: accountResult }));
    // return of(new HttpResponse({ status: 200, body:[] }));
  }

  private serveCompanyDBServerData(request: HttpRequest<any>) {
    return of(new HttpResponse({ status: 200, body: this.companyDBServers }));
  }

}
