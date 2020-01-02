import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Company } from "../../shared/models/company";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Account } from '../../shared/models/account';

@Injectable({
  providedIn: "root"
})

export class CompanyService {
  constructor(private http: HttpClient) { }

  getCompanyData(request): Observable<Company[]> {
    return this.http
      .get<any>(`${environment.apiBaseURL}/company`, {
        params: request
      })
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  createCompanyWith(company): Observable<any[]> {
    return this.createCompany(company);
  }

  updateCompanyWith(company, companyID: number): Observable<any[]> {
    return this.updateCompany(companyID, company);
  }

  getAccountData(request):Observable<Account[]> {
    return this.http.post<any>(`${environment.apiBaseURL}/account`,request)
    .pipe(
      map(data =>{
        return data;
      })
    )
  }

  getCloudServerData(request): Observable<any[]> {
    return this.http
      .get<any>(`${environment.apiBaseURL}/company/companyDBServers`)
      .pipe(map(data => {
        return data;
      })
      );
  }

  statusUpdate(request): Observable<any[]> {
    return this.http
      .post<any>(`${environment.apiBaseURL}/company/updateStatus`, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  // Private Methods

  private createCompany(request): Observable<any[]> {
    return this.http
      .post<any>(`${environment.apiBaseURL}/company`, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  private updateCompany(companyID, request): Observable<any[]> {
    return this.http
      .post<any>(`${environment.apiBaseURL}/company/` + companyID, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }
}
