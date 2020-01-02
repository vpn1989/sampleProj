import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Industry } from "../../../shared/models/industry";
import { Application } from "../../../shared/models/application";
import { Category } from "../../../shared/models/category";
import { MasterFile } from "src/app/feature/shared/models/master-file";
import { AssetIcons } from 'src/app/shared/services/file-processing.service';

@Injectable({
  providedIn: "root"
})
export class ApplicationService {

  private assets: AssetIcons[] = [];
  private deletedAssets: AssetIcons[] = [];

  constructor(private http: HttpClient) { }

  getApplications(request): Observable<Application[]> {
    return this.getAllApplications(request);
  }

  getAllApplications(request): Observable<Application[]> {
    // Initialize Params Object
    // let params = new HttpParams();
    return this.http
      .get<any>(`${environment.apiBaseURL}/application/all`, {
        params: request
      })
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  getApplicationTypes(): Observable<any> {
    return this.http
      .get<any>(`${environment.apiBaseURL}/application/types`)
      .pipe(
        map(response => {
          const applicationTypes = [...response.ApplicationTypes];
          let responseData = [];
          applicationTypes.filter(type => {
            responseData.push({
              appTypeCode: type.AppTypeCode,
              appType: type.AppType
            })

          });
          return responseData;
        })
      );
  }

  getSupportingApps(): Observable<any> {
    return this.http
      .get<any>(`${environment.apiBaseURL}/application/supportingApps`)
      .pipe(
        map(response => {
          const supportingApps = [...response.SupportingApps];
          let responseData = [];
          supportingApps.filter(supportingApp => {
            responseData.push({
              appId: supportingApp.ID,
              code: supportingApp.Code,
              name: supportingApp.Name,
              summary: supportingApp.Summary,
              description: supportingApp.Description,
              vendorId: supportingApp.VendorId,
              vendorName: supportingApp.AppVendorName,
              vendorWebsite: supportingApp.AppVendorWebsite,
              vendorAddress: supportingApp.AppVendorAddress,
              subscribed: supportingApp.Subscribed,
              pending: supportingApp.Pending,
              rating: supportingApp.Rating,
              urlSuffix: supportingApp.UrlSuffix,
              count: supportingApp.Count,
            })

          });


          console.log("getSupportingApps==> ", supportingApps, responseData);

          return responseData;
        })
      );
  }

  getApplicationById(applicationId): Observable<any> {
    return this.http
      .get<any>(`${environment.apiBaseURL}/application/` + applicationId)
      .pipe(
        map(response => {
          const applicationDetails = response.Application[0];
          this.assets = response.Assets;
          const assets = this.clusterAssets(
            this.assets.map(asset => {
              return { assetId: asset.AssetID, assetUrl: asset.AssetURL, assetType: asset.AssetType };
            })
          );

          const icons = assets.icons;

          const icon16 = (icons && icons.length) ?
            (icons.find(icon => icon.type === "FavIcon16") ? icons.find(icon => icon.type === "FavIcon16") : {}) :
            {};

          const icon32 = (icons && icons.length) ?
            (icons.find(icon => icon.type === "FavIcon32") ? icons.find(icon => icon.type === "FavIcon32") : {}) :
            {};

          const icon64 = (icons && icons.length) ?
            (icons.find(icon => icon.type === "FavIcon64") ? icons.find(icon => icon.type === "FavIcon64") : {}) :
            {};

          const icon128 = (icons && icons.length) ?
            (icons.find(icon => icon.type === "FavIcon128") ? icons.find(icon => icon.type === "FavIcon128") : {}) :
            {};

          const bannerImage = assets.bannerImage;
          const screenshots = assets.screenshots;
          const supportingApps = response.SupportingApps;
          const accessRights = response.AccessRights
          // console.log("Industries==> ", response.Industries);
          const industryIds = response.Industries.map(industry => industry.IndustryID);
          return {
            appId: applicationDetails.ID,
            categoryId: applicationDetails.CategoryId,
            code: applicationDetails.Code,
            name: applicationDetails.Name,
            summary: applicationDetails.Summary,
            description: applicationDetails.Description,
            vendorId: applicationDetails.VendorId,
            vendorName: applicationDetails.AppVendorName,
            vendorWebsite: applicationDetails.AppVendorWebsite,
            vendorAddress: applicationDetails.AppVendorAddress,
            subscribed: applicationDetails.Subscribed,
            pending: applicationDetails.Pending,
            rating: applicationDetails.Rating,
            urlSuffix: applicationDetails.UrlSuffix,
            count: applicationDetails.Count,
            appTypeCode: applicationDetails.AppTypeCode,
            appType: applicationDetails.AppType,
            industryIds,
            icons,
            icon16,
            icon32,
            icon64,
            icon128,
            bannerImage,
            screenshots,
            supportingApps,
            accessRights
          };
        })
      );
  }

  clusterAssets(assets: {
    assetId: number;
    assetUrl: string;
    assetTypeId?: number;
    assetType: string;
  }[]): {
    icons: any;
    bannerImage: any;
    screenshots: any
  } {
    const response = {
      icons: [],
      bannerImage: {},
      screenshots: []
    };
    assets.map(asset => {
      if (asset.assetType === "BannerImage") {
        response.bannerImage = {
          id: asset.assetId,
          url: asset.assetUrl,
          type: asset.assetType
        };
      } else if (asset.assetType.startsWith("FavIcon")) {
        response.icons.push({
          id: asset.assetId,
          url: asset.assetUrl,
          type: asset.assetType
        });
      } else if (asset.assetType === "Screenshot") {
        response.screenshots.push({
          id: asset.assetId,
          url: asset.assetUrl,
          type: asset.assetType
        });
      }
    });
    return response;
  }


  saveApplication(formValue): Observable<Application[]> {
    const formData = new FormData();
    for (const key in formValue) {
      // console.log("formValue[key] ####==> ", formValue[key], formValue[key].length);
      if (formValue.hasOwnProperty(key)) {
        if (key === "screenshots") {
          for (const screenshot in formValue[key]) {
            if (formValue[key].hasOwnProperty(screenshot)) {
              if (formValue[key] && formValue[key].length) {
                let deletedScreenShots = formValue[key].filter(val => val.isDeleted);
                if (deletedScreenShots) {
                  this.findDeletedFile(deletedScreenShots, key);
                }
              }
              if ((formValue[key] && formValue[key].length) && !formValue[key][screenshot].isDeleted) {
                formData.append("screenshots", (formValue[key] && formValue[key].length) ?
                  ((formValue[key][screenshot] && formValue[key][screenshot].file) ? formValue[key][screenshot].file : null) :
                  null);
              }

            }
          }
        } else if (key.startsWith("icon") || key === "bannerImage") {
          formData.append(key, (formValue[key] && formValue[key].length) ? formValue[key][0].file : null);
        } else {
          if (key !== "selectedIndustryIds") {
            formData.append(key, formValue[key]);
          }
        }
      }
    }

    // console.log("deletedAssets 000==> ", this.deletedAssets);

    if (formValue.appId) {
      formData.append("assetsJson", JSON.stringify(this.assets));
      formData.append("deletedScreenshotsJson", ((this.deletedAssets && this.deletedAssets.length) ?
        JSON.stringify(this.deletedAssets) : ""));
      return this.updateApplication(formValue.appId, formData);
    }
    return this.addApplication(formData);
  }

  findDeletedFile(deletedIcon, key) {
    for (const key in deletedIcon) {
      let getDeletedAsset = this.assets.find(asset => asset.AssetID === deletedIcon[key].id);

      this.deletedAssets.push(getDeletedAsset);

      let duplicateDeletedScreenshots = []
      this.deletedAssets.forEach((item, index) => {
        if (duplicateDeletedScreenshots.findIndex(i => i.AssetID == item.AssetID) === -1) {
          duplicateDeletedScreenshots.push(item)
        }

      });
      this.deletedAssets = duplicateDeletedScreenshots;
      // console.log("deletedAssets 1111 ==> ", this.deletedAssets, deletedIcon);

    };
  }

  addApplication(request) {
    // console.log("addApplication==> ", JSON.stringify(request));
    return this.http
      .post<any>(`${environment.apiBaseURL}/application`, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  updateApplication(appId, request): Observable<any[]> {
    // console.log("updateApplication==> ", JSON.stringify(request));
    return this.http
      .post<any>(`${environment.apiBaseURL}/application/` + appId, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  getAllIndustries(): Observable<Industry[]> {
    return this.http
      .get<any>(`${environment.apiBaseURL}/industry`)
      .pipe(
        map(response => {
          return response.Industries.map(item => {
            return {
              id: item.IndustryID,
              name: item.IndustryName
            };
          });
        })
      );
  }

  getAllCategories(): Observable<Category[]> {
    return this.http
      .get<any>(`${environment.apiBaseURL}/categories`)
      .pipe(
        map(response => {
          return response.Categories.map(item => {
            return {
              id: item.CategoryID,
              name: item.CategoryName
            };
          });
        })
      );
  }

  saveMasterFile(request): Observable<MasterFile[]> {
    return this.http
      .post<any>(`${environment.apiBaseURL}/uploadFile`, request, {})
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  statusUpdate(request): Observable<any[]> {
    return this.http
      .post<any>(`${environment.apiBaseURL}/application/updateStatus`, request)
      .pipe(
        map(data => {
          return data;
        })
      );
  }
}
