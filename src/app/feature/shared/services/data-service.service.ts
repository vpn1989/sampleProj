import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DataService {

  showToast = false;
  showToastTrigger = true;

  constructor(private http: HttpClient) { }

  getUserDetail(key) {
    return sessionStorage.getItem(key)
  }

  setUserDetail(key, userValue) {
    sessionStorage.setItem(key, userValue);
  }

  getLocale() {
    return localStorage.getItem("locale");
  }

  setLocale(language) {
    return localStorage.setItem("locale", language);
  }

  damUpload(request): Observable<any[]> {
    return this.http
      .post<any>(`${environment.apiBaseURL}/dam/upload`, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  getRequestStatusList(): Observable<any> {
    return this.http
      .get<any>(`${environment.apiBaseURL}/request-status`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  statusUpdate(request): Observable<any[]> {
    return this.http
    .post<any>(`${environment.apiBaseURL}/accountRequest/updateStatus`, request)
    .pipe(
      map(data => {
        return data;
      })
    );
  }

}

export enum Status {
  Unknown = 0,
  New = 1,
  Accepted = 2,
  Rejected = 3,
  Processing = 4
}
