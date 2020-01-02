import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { mergeMap, materialize, delay, dematerialize } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Industry } from "src/app/feature/shared/models/industry";
import { industriesMock } from "./industries-mock";

@Injectable()
export class IndustriesMockService implements HttpInterceptor {
  private industries: Industry[] = industriesMock;

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return of(null)
      .pipe(
        mergeMap(() => {

          if (request.url.match(`^${environment.apiBaseURL}/industry/all`)) {
            if (request.method === "GET") {
              return this.serveAllIndustryRequest(request);
            }
          }

          if (request.url.match(`^${environment.apiBaseURL}/industry/updateStatus`)) {
            if (request.method === "POST") {
              return this.updateStatus(request);
            }
          }

          if (request.url.match(`^${environment.apiBaseURL}/industry/update`)) {
            if (request.method === "POST") {
              return this.addNewIndustry(request);
            }
          }

          if (request.url.match(`^${environment.apiBaseURL}/industry/delete`)) {
            if (request.method === "POST") {
              return this.addNewIndustry(request);
            }
          }

          if (request.url.match(`^${environment.apiBaseURL}/industry`)) {
            if (request.method === "GET") {
              return this.serveIndustryRequest(request);
            } else if (request.method === "POST") {
              return this.addNewIndustry(request);
            }
          }

          return next.handle(request);
        })
      )
      .pipe(materialize())
      .pipe(delay(1000))
      .pipe(dematerialize());
  }

  private updateStatus(dataRequest: HttpRequest<Industry>) {
    return of(new HttpResponse({ status: 200, body: {} }));
  }

  private addNewIndustry(dataRequest: HttpRequest<Industry>) {
    return of(new HttpResponse({ status: 200, body: {} }));
  }

  private serveAllIndustryRequest(request: HttpRequest<Industry>) {
    const industryID: number = this.getParam(request.params, "IndustryID", 0);
    const industryCode: string = this.getParam(
      request.params,
      "IndustryCode",
      ""
    );
    const pageNumber: number = this.getParam(request.params, "PageNumber", 0);
    const pageSize: number = this.getParam(request.params, "PageSize", 0);
    const industriesResult: any = { ...this.industries };

    if (industryID !== 0) {
      industriesResult.Industries = industriesResult.Industries.filter(
        (apps: any) => apps.IndustryID === industryID
      );
    }
    if (industryCode !== "") {
      industriesResult.Industries = industriesResult.Industries.filter(
        (apps: any) =>
          apps.IndustryCode.toLowerCase().indexOf(industryCode.toLowerCase()) >
          -1
      );
    }

    if (pageNumber !== 0 && pageSize !== 0) {
      const first = 0;
      const last = pageSize - 1;
      // console.log("page==> ",pageNumber, pageSize, (first+((pageNumber-1)*pageSize)), (last+((pageNumber-1)*pageSize)));
      if (pageNumber > 1) {
        industriesResult.Industries = industriesResult.Industries.slice(
          first + (pageNumber - 1) * pageSize,
          last + (pageNumber - 1) * pageSize + 1
        );
      } else {
        industriesResult.Industries = industriesResult.Industries.slice(
          first,
          last + 1
        );
      }
    }

    return of(new HttpResponse({ status: 200, body: industriesResult }));
  }

  private serveIndustryRequest(request: HttpRequest<Industry>) {
    const industryID: number = this.getParam(request.params, "IndustryID", 0);
    const industryCode: string = this.getParam(
      request.params,
      "IndustryCode",
      ""
    );
    const pageNumber: number = this.getParam(request.params, "PageNumber", 0);
    const pageSize: number = this.getParam(request.params, "PageSize", 0);

    const industriesResult: any = { ...this.industries };

    if (industryID !== 0) {
      industriesResult.Industries = industriesResult.Industries.filter(
        (apps: any) => apps.IndustryID === industryID
      );
    }
    if (industryCode !== "") {
      industriesResult.Industries = industriesResult.Industries.filter(
        (apps: any) =>
          apps.IndustryCode.toLowerCase().indexOf(industryCode.toLowerCase()) >
          -1
      );
    }

    industriesResult.Industries = industriesResult.Industries.filter((industry) => !industry.IsDeleted);

    if (pageNumber !== 0 && pageSize !== 0) {
      const first = 0;
      const last = pageSize - 1;
      // console.log("page==> ",pageNumber, pageSize, (first+((pageNumber-1)*pageSize)), (last+((pageNumber-1)*pageSize)));
      if (pageNumber > 1) {
        industriesResult.Industries = industriesResult.Industries.slice(
          first + (pageNumber - 1) * pageSize,
          last + (pageNumber - 1) * pageSize + 1
        );
      } else {
        industriesResult.Industries = industriesResult.Industries.slice(
          first,
          last + 1
        );
      }
    }

    return of(new HttpResponse({ status: 200, body: industriesResult }));
  }

  private getParam(params, parameterName, defaultValue) {
    let retunValue = params ? params.get(parameterName) : defaultValue;
    if (retunValue == null || retunValue === undefined) {
      retunValue = defaultValue;
    }
    return retunValue;
  }
}
