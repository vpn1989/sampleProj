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
import { Plan } from "../../../feature/shared/models/plans";
import { plansMock } from "./plans-mock";

@Injectable({
  providedIn: "root"
})
export class PlansMockService implements HttpInterceptor {

  private plan: Plan[] = plansMock;

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return of(null)
      .pipe(
        mergeMap(() => {
          if (
            request.url.match(`^${environment.apiBaseURL}/plan/`) &&
            request.method === "GET"
          ) {
            // console.log("--- Serving Application List ---");
            return this.servePlansRequest(request);
          }
          return next.handle(request);
        })
      )
      .pipe(materialize())
      .pipe(delay(1000))
      .pipe(dematerialize());
  }

  private servePlansRequest(request: HttpRequest<Plan>) {
    const planID: number = this.getParam(request.params, "pageCode", "");
    const planCode: string = this.getParam(request.params, "planCode", "");
    const pageNumber: number = this.getParam(request.params, "pageNumber", 0);
    const pageSize: number = this.getParam(request.params, "pageSize", 0);

    const planResult: any = { ...this.plan };

    if (planID !== 0) {
      planResult.Plans = planResult.Plans.filter(
        (apps: any) => apps.PlanID === planID
      );
    }

    if (planCode !== "") {
      planResult.Plans = planResult.Plans.filter(
        (apps: any) =>
        apps.PlanCode.toLowerCase().indexOf(planCode.toLowerCase()) > -1
      );
    }

    if (pageNumber !== 0 && pageSize !== 0) {
      const first = 0;
      const last = pageSize - 1;
      if (pageNumber > 1) {
        planResult.Plans = planResult.Plans.slice(
          first + (pageNumber - 1) * pageSize,
          last + (pageNumber - 1) * pageSize + 1
        );
      } else {
        planResult.Plans = planResult.Plans.slice(
          first,
          last + 1
        );
      }
    }

    // console.log("--- application ---", applicationResult);
    // if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
    return of(new HttpResponse({ status: 200, body: planResult }));
  }

  private getParam(params, parameterName, defaultValue) {
    let returnValue = params ? params.get(parameterName) : defaultValue;
    if (returnValue == null || returnValue === undefined) {
      returnValue = defaultValue;
    }
    return returnValue;
  }
}
