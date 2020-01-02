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
import { applicationsMock } from "./applications-mock";
import { categoriesMock } from "../categories/categories-mock";
import { applicationDetailsMock } from "./application-details-mock";
import { subscriptionMock } from "./subscriptions-mock";
import { Application } from "src/app/feature/shared/models/application";
import { Category } from "src/app/feature/shared/models/category";
import { Subscription } from "../../../feature/shared/models/subscription";
import { Vendor } from "src/app/feature/shared/models/vendors";
import { vendorsMock } from "../vendors-mock";

@Injectable()
export class ApplicationsMockService implements HttpInterceptor {
  private application: Application[] = applicationsMock;
  private categories: Category[] = categoriesMock;
  private applicationDetails: any[] = applicationDetailsMock;
  private subscriptions: Subscription[] = subscriptionMock;
  private vendors: Vendor[] = vendorsMock;

  constructor() {
    console.log("ApplicationsMock Service Enabled");
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return of(null)
      .pipe(
        mergeMap(() => {
          if (
            request.url.match(
              `^${environment.apiBaseURL}/application/fetch-app-details`
            ) &&
            request.method === "GET"
          ) {
            // console.log("--- Serving application Details ---", request);
            return this.serveApplicationDetails(request);
          }
          if (
            request.url.match(`^${environment.apiBaseURL}/application`) &&
            request.method === "GET"
          ) {
            // console.log("--- Serving Application List ---");
            return this.serveApplicationsRequest(request);
          }
          if (
            request.url.match(`^${environment.apiBaseURL}/subscription`) &&
            request.method === "GET"
          ) {
            // console.log("--- Serving Categories List ---", request);
            return this.serveSubscriptionResult(request);
          }
          if (
            request.url.match(`^${environment.apiBaseURL}/vendors`) &&
            request.method === "GET"
          ) {
            return this.getVendorData(request);
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

  private serveApplicationsRequest(request: HttpRequest<Application>) {
    const industryID: number = this.getParam(request.params, "IndustryID", 0);
    const pageNumber: number = this.getParam(request.params, "PageNumber", 0);
    const pageSize: number = this.getParam(request.params, "PageSize", 0);
    const appCategoryIDs: string = this.getParam(
      request.params,
      "AppCategoryIDs",
      ""
    );
    const appID: number = this.getParam(request.params, "AppID", 0);
    const appCode: string = this.getParam(request.params, "AppCode", "");
    const appName: string = this.getParam(request.params, "AppName", "");
    // let requestParameter = request.params
    //  ? request.params.get("requestParameter")
    //  : {};
    const applicationResult: any = { ...this.application };
    console.log(
      "--- Serving Application List3 ---",
      applicationResult,
      this.application
    );

    if (industryID !== 0) {
      applicationResult.Applications = applicationResult.Applications.filter(
        (apps: any) => apps.IndustryID === industryID
      );
    }

    if (appCategoryIDs !== "") {
      const splitTiltArray = appCategoryIDs.split("~");
      applicationResult.Applications = applicationResult.Applications.filter(
        (apps: any) =>
          splitTiltArray.find(
            filterVal => apps.AppCategoryID === parseInt(filterVal, 10)
          )
      );
    }

    if (appID !== 0) {
      applicationResult.Applications = applicationResult.Applications.filter(
        (apps: any) => apps.AppID === appID
      );
    }

    if (appCode !== "") {
      applicationResult.Applications = applicationResult.Applications.filter(
        (apps: any) =>
          apps.AppCode.toLowerCase().indexOf(appCode.toLowerCase()) > -1
      );
    }

    if (appName !== "") {
      applicationResult.Applications = applicationResult.Applications.filter(
        (apps: any) =>
          apps.AppName.toLowerCase().indexOf(appName.toLowerCase()) > -1
      );
    }

    if (pageNumber !== 0 && pageSize !== 0) {
      const first = 0;
      const last = pageSize - 1;
      // console.log("page==> ",pageNumber, pageSize, (first+((pageNumber-1)*pageSize)), (last+((pageNumber-1)*pageSize)));
      if (pageNumber > 1) {
        applicationResult.Applications = applicationResult.Applications.slice(
          first + (pageNumber - 1) * pageSize,
          last + (pageNumber - 1) * pageSize + 1
        );
      } else {
        applicationResult.Applications = applicationResult.Applications.slice(
          first,
          last + 1
        );
      }
    }

    console.log("--- HttpResponse ---", request, applicationResult);

    // console.log("--- application ---", applicationResult);
    // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
    return of(new HttpResponse({ status: 200, body: applicationResult }));
    // } else {
    //   return throwError({ error: { message: 'Unauthorised' } });
    // }
  }

  private serveApplicationRequest(request: HttpRequest<Application>) {
    const urlParts = request.url.split("/");
    const id = parseInt(urlParts[urlParts.length - 1], 10);
    const matchedApplication = this.application.filter(
      application => application.appID === id
    );
    if (matchedApplication.length) {
      return of(new HttpResponse({ status: 200, body: matchedApplication[0] }));
    } else {
      return of(
        new HttpResponse({
          status: 404,
          statusText: "Application Not Found"
        })
      );
    }
  }

  private serveApplicationDetails(request: HttpRequest<Application>) {
    const appId: number = this.getParam(request.params, "AppID", 0);

    const applnDetailsResult: any = { ...this.applicationDetails };

    // if (appId !== 0) {
    //   applnDetailsResult.Industry = applnDetailsResult.Industry.filter(
    //     (apps: any) => apps.AppID === appId
    //   );
    // }

    return of(new HttpResponse({ status: 200, body: applnDetailsResult }));
  }

  private getVendorData(request: HttpRequest<Vendor>) {
    const id: number = this.getParam(request.params, "ID", 0);
    const code: string = this.getParam(request.params, "Code", "");
    const pageNumber: number = this.getParam(request.params, "PageNumber", 0);
    const pageSize: number = this.getParam(request.params, "PageSize", 0);

    const vendorsResult: any = { ...this.vendors };

    if (id !== 0) {
      vendorsResult.Vendors = vendorsResult.Vendors.filter(
        (vendor: any) => vendor.ID === id
      );
    }

    if (code !== "") {
      vendorsResult.Vendors = vendorsResult.Vendors.filter(
        (vendor: any) =>
          vendor.Code.toLowerCase().indexOf(code.toLowerCase()) > -1
      );
    }

    if (pageNumber !== 0 && pageSize !== 0) {
      const first = 0;
      const last = pageSize - 1;
      if (pageNumber > 1) {
        vendorsResult.Vendors = vendorsResult.Vendors.slice(
          first + (pageNumber - 1) * pageSize,
          last + (pageNumber - 1) * pageSize + 1
        );
      } else {
        vendorsResult.Vendors = vendorsResult.Vendors.slice(first, last + 1);
      }
    }

    return of(new HttpResponse({ status: 200, body: vendorsResult }));
  }

  private serveSubscriptionResult(request: HttpRequest<Subscription>) {
    const pageNumber: number = this.getParam(request.params, "PageNumber", 0);
    const pageSize: number = this.getParam(request.params, "PageSize", 0);
    const companyName: string = this.getParam(
      request.params,
      "CompanyName",
      ""
    );

    const subscriptionResult: any = { ...this.subscriptions };

    subscriptionResult.Subscriptions = subscriptionResult.Subscriptions.filter(
      (apps: any) => !apps.Status
    );

    if (companyName !== "") {
      subscriptionResult.Subscriptions = subscriptionResult[
        "result-set-1"
      ].filter(
        (apps: any) =>
          apps.CompanyName.toLowerCase().indexOf(companyName.toLowerCase()) > -1
      );
    }

    if (pageNumber !== 0 && pageSize !== 0) {
      const first = 0;
      const last = pageSize - 1;
      // console.log("page==> ",pageNumber, pageSize, (first+((pageNumber-1)*pageSize)), (last+((pageNumber-1)*pageSize)));
      if (pageNumber > 1) {
        subscriptionResult.Subscriptions = subscriptionResult.Subscriptions.slice(
          first + (pageNumber - 1) * pageSize,
          last + (pageNumber - 1) * pageSize + 1
        );
      } else {
        subscriptionResult.Subscriptions = subscriptionResult.Subscriptions.slice(
          first,
          last + 1
        );
      }
    }

    return of(new HttpResponse({ status: 200, body: subscriptionResult }));
  }
}
