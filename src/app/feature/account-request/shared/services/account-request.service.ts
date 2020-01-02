import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AccountRequest } from 'src/app/feature/shared/models/account-request';

@Injectable({
  providedIn: 'root'
})
export class AccountRequestService {

  constructor(private http: HttpClient) { }

  getRequestList(request): Observable<AccountRequest[]> {
    return this.http
      .get<any>(`${environment.apiBaseURL}/account-request/`, {
        params: request
      })
      .pipe(
        map(data => {
          return data;
        })
      );
  }
}
