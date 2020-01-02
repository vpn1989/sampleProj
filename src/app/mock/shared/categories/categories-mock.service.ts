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
import { Category } from "src/app/feature/shared/models/category";
import { categoriesMock } from "./categories-mock";

@Injectable({
  providedIn: 'root'
})
export class CategoriesMockService {

  private categories: Category[] = categoriesMock;

  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return of(null)
      .pipe(
        mergeMap(() => {
          if (
            request.url.match(`^${environment.apiBaseURL}/category/all`) &&
            request.method === "GET"
          ) {
            // console.log("--- Serving Categories List ---", request);
            return this.serveCategoriesResult(request);
          }

          if (request.url.match(`^${environment.apiBaseURL}/category/updateStatus`)) {
            if (request.method === "POST") {
              return this.updateStatus(request);
            }
          }

          return next.handle(request);
        })
      )
      .pipe(materialize())
      .pipe(delay(1000))
      .pipe(dematerialize());
  }

  private updateStatus(dataRequest: HttpRequest<Category>) {
    return of(new HttpResponse({ status: 200, body: {} }));
  }

  private getParam(params, parameterName, defaultValue) {
    let retunValue = params ? params.get(parameterName) : defaultValue;
    if (retunValue == null || retunValue === undefined) {
      retunValue = defaultValue;
    }
    return retunValue;
  }

  private serveCategoriesResult(request: HttpRequest<Category>) {
    const industryID: number = this.getParam(request.params, "IndustryID", 0);
    const appCategoryID: number = this.getParam(
      request.params,
      "categoryId",
      0
    );
    const pageNumber: number = this.getParam(request.params, "PageNumber", 0);
    const pageSize: number = this.getParam(request.params, "PageSize", 0);
    const appCategoryCode: string = this.getParam(
      request.params,
      "categoryCode",
      ""
    );

    const categoriesResult: any = { ...this.categories };

    if (industryID !== 0) {
      categoriesResult.Categories = categoriesResult.Categories.filter(
        (apps: any) => apps.IndustryID === industryID
      );
    }

    if (appCategoryID !== 0) {
      categoriesResult.Categories = categoriesResult.Categories.filter(
        (apps: any) => apps.CategoryID === appCategoryID
      );
    }

    if (appCategoryCode !== "") {
      categoriesResult.Categories = categoriesResult.Categories.filter(
        (apps: any) =>
          apps.CategoryCode.toLowerCase().indexOf(
            appCategoryCode.toLowerCase()
          ) > -1
      );
    }

    if (pageNumber !== 0 && pageSize !== 0) {
      const first = 0;
      const last = pageSize - 1;
      // console.log("page==> ",pageNumber, pageSize, (first+((pageNumber-1)*pageSize)), (last+((pageNumber-1)*pageSize)));
      if (pageNumber > 1) {
        categoriesResult.Categories = categoriesResult.Categories.slice(
          first + (pageNumber - 1) * pageSize,
          last + (pageNumber - 1) * pageSize + 1
        );
      } else {
        categoriesResult.Categories = categoriesResult.Categories.slice(
          first,
          last + 1
        );
      }
    }

    return of(new HttpResponse({ status: 200, body: categoriesResult }));
  }

}
