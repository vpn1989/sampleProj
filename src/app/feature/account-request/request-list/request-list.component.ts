import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountRequestService } from "../shared/services/account-request.service";
import { DataService, Status } from "../../shared/services/data-service.service";
import { ToastService } from 'src/app/shared/services/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-request-list",
  templateUrl: "./request-list.component.html",
  styleUrls: ["./request-list.component.scss"]
})
export class RequestListComponent implements OnInit {
  searchForm: FormGroup;
  showLoading: boolean;
  accountRequests: any[] = [];
  accountRequestsList: any[] = [];
  collectionSize: number;
  page = 1;
  maxPageSize = 10;
  countList = [10, 20, 100];
  requestStatusList: any[] = [];
  showDialog = false;
  closable = false;
  statusUpdateAccountRequest: any = {};
  accountStatus = "";
  statusName = Status.Unknown;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private service: AccountRequestService,
    private router: Router) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      requestStatus: ["", Validators.required],
      count: [this.maxPageSize]
    });
    this.getAccountRequest();
    this.getRequestStatusList();
  }

  getAccountRequest() {
    const request = {
      pageNumber: this.page,
      pageSize: this.maxPageSize
    };
    this.showLoading = true;
    this.service.getRequestList(request).subscribe(
      (response: any) => {
        this.accountRequests = response.Requests;
        this.accountRequestsList = response.Requests;
        this.collectionSize = response.Requests.length;
        this.showLoading = false;
      }, error => {
        this.showLoading = false;
      }
    );
  }

  get status() {
    return Status;
  }

  navigateToCompany() {
    this.router.navigate(["/company/account-request", this.statusUpdateAccountRequest.AccountRequestID]);
  }

  updateCount() {
    this.page = 1;
    this.maxPageSize = this.searchForm.value.count;
    this.getAccountRequest();
  }

  getRequestStatusList() {
    this.dataService.getRequestStatusList().subscribe(
      (response: any) => {
        this.requestStatusList = response.RequestStatus;
        this.requestStatusList = this.requestStatusList.filter((statusList => {
          return (statusList.RequestStatusID === 1) || (statusList.RequestStatusID === 4)
        }))
      }, error => {
      }
    );
  }

  processingRequest(accountRequestId, statusName) {
    this.statusUpdateAccountRequest = {
      AccountRequestID: accountRequestId,
      RequestStatusID: statusName
    }

    this.statusName = statusName;

    this.showDialog = !this.showDialog;
    this.closable = true;
  }

  closeCallBack(event) {
    let accountRequest: any = {};
    this.showDialog = false;
    if (!event.continue) {
      return;
    }

    if (this.statusName == Status.Accepted) {
      this.statusName = Status.Unknown;
      this.navigateToCompany();
    } else if (this.statusName == Status.Processing || this.statusName == Status.Rejected) {
      this.showLoading = true;
      this.dataService.statusUpdate(this.statusUpdateAccountRequest).subscribe(
        (data: any) => {
          this.showLoading = false;
          this.getAccountRequest();
          this.statusUpdateAccountRequest = {};
          this.statusName = Status.Unknown;
          this.toastService.show(this.translateService.instant("common.updated_successfully"), {
            autohide: true,
            info: 'success',
            headertext: this.translateService.instant("common.success")
          }
          );

        },
        error => {
          this.showLoading = false;
          this.statusUpdateAccountRequest = {};
          this.statusName = Status.Unknown;
        }
      );
    }
  }

  searachFormRequestStausChange() {
    if (this.searchForm.value.requestStatus === "") {
      this.accountRequests = [...this.accountRequestsList];
      return;
    }
    this.accountRequests = [...this.accountRequestsList].filter(
      (item) => {
        return item.RequestStatusID + "" === this.searchForm.value.requestStatus;
      }
    );
    console.log(this.accountRequests);
  }

}
