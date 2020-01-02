import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApplicationService } from "../shared/services/application.service";
import { ToastService } from 'src/app/shared/services/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-application-list",
  templateUrl: "./application-list.component.html",
  styleUrls: ["./application-list.component.scss"]
})
export class ApplicationListComponent implements OnInit {
  searchForm: FormGroup;

  showApplicationLoading = false;
  industryID: number;

  applications: any[] = [];
  appIndustries: any[] = [];
  industries: any[] = [];
  categories: any[] = [];
  collectionSize: number;
  page = 1;
  maxPageSize = 10;
  countList = [5, 10, 20, 100];
  showDialog = false;
  closable = false;
  statusUpdateApp = {};

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private translateService: TranslateService,
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      applicationCode: [""],
      categoryID: [""],
      industryID: [""],
      count: [this.maxPageSize]
    });
    this.getAllApplications();
    this.getAllCategoriesList();
    this.getAllIndustriesList();
  }

  getAllApplications() {
    this.showApplicationLoading = true;
    const applicationRequest = {
      industryIds: this.searchForm.value.industryID,
      categoryId: this.searchForm.value.categoryID,
      searchKeyword: this.searchForm.value.applicationCode,
      pageNumber: this.page,
      pageSize: this.maxPageSize
    };
    this.applications = [];
    this.applicationService.getApplications(applicationRequest).subscribe(
      (data: any) => {
        this.applications = data.Applications;
        this.appIndustries = data.Industries;
        this.collectionSize = data.PageMeta[0].Cnt;
        this.showApplicationLoading = false;
      },
      error => {
        this.showApplicationLoading = false;
      }
    );
  }

  getAppIndustry(appID) {
    let appIndusName = "";
    this.appIndustries.filter(appIndustry => {
      if (appID === appIndustry.AppID) {
        appIndusName = appIndusName ? (appIndusName + ", " + appIndustry.IndustryName) : appIndustry.IndustryName;
      }
    });
    return appIndusName;
  }

  getAllCategoriesList() {
    this.categories = [];
    this.applicationService.getAllCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      () => {
      }
    );
  }

  getApplicationsByCatID() {
    this.searchForm.get("industryID").setValue("");
    this.getAllApplications();
    this.getAllIndustriesList();
  }

  getApplicationsByIndustryID() {
    this.getAllApplications();
  }

  getAllIndustriesList() {
    this.industries = [];
    this.applicationService.getAllIndustries().subscribe(
      (data: any) => {
        this.industries = data;
      },
      error => {
      }
    );
  }

  onSubmit() {
    this.getAllApplications();
  }

  onPageChange(page) {
    this.page = page;
    this.getAllApplications();
  }

  updateCount() {
    this.page = 1;
    this.maxPageSize = this.searchForm.value.count;
    this.getAllApplications();
  }

  changeStatus(appId, isDeleted) {
    this.statusUpdateApp = {
      AppID: appId,
      Status: isDeleted
    }
    this.showDialog = !this.showDialog;
  }

  proceedStatusUpdate(event) {
    this.showDialog = false;
    if (event.continue) {
      this.showApplicationLoading = true;
      this.applicationService.statusUpdate(this.statusUpdateApp).subscribe(
        (data: any) => {
          this.getAllApplications();
          this.statusUpdateApp = {};
          this.toastService.show(this.translateService.instant("common.updated_successfully"), {
            autohide: true,
            info: 'success',
            headertext: this.translateService.instant("common.success")
          }
          );
        },
        error => {
          this.showApplicationLoading = false;
          this.statusUpdateApp = {};
        }
      );
    }
  }

}
