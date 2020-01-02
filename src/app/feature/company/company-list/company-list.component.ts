import { Component, OnInit } from "@angular/core";
import { Company } from "../../shared/models/company";
import { FormGroup, FormBuilder } from "@angular/forms";
import { CompanyService } from "../shared/company.service";
import { ToastService } from 'src/app/shared/services/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-company-list",
  templateUrl: "./company-list.component.html",
  styleUrls: ["./company-list.component.scss"]
})
export class CompanyListComponent implements OnInit {
  companies: Company[];
  showLoader = false;
  searchForm: FormGroup;
  collectionSize: number;
  companyStatusUpdate = {};
  showDialog: boolean;
  closable: boolean;
  infoMessage: string;
  messageInfo: string;
  page = 1;
  maxPageSize = 10;
  countList = [10, 20, 100];

  constructor(
    private service: CompanyService,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      companyCode: [""],
      count: [this.maxPageSize]
    });

    this.fetchCompanyList();
  }

  fetchCompanyList(fetchParam = "") {
    this.companies = [];
    this.showLoader = true;
    const request = {
      companyCode: this.searchForm.value.companyCode,
      pageNumber: this.page,
      pageSize: this.maxPageSize
    };

    this.service.getCompanyData(request).subscribe(
      (data: any) => {
        this.companies = data.Companies;
        this.collectionSize = data.PageMeta[0].Cnt;
        this.showLoader = false;
      },
      error => {
        this.showLoader = false;
      }
    );
  }

  onSubmit() {
    this.fetchCompanyList(this.searchForm.value.companyCode);
  }

  changeStatus(companyId, isActivated) {
    this.companyStatusUpdate = {
      CompanyID: companyId,
      Status: isActivated
    }
    this.showDialog = !this.showDialog;
  }

  onPageChange(page) {
    this.page = page;
    console.log("onPageChange==> ", this.collectionSize, this.page);
    this.fetchCompanyList(this.searchForm.value.companyCode);
  }

  updateCount() {
    this.page = 1;
    this.maxPageSize = this.searchForm.value.count;
    this.fetchCompanyList();
  }

  openWeblink(link = "") {
    if (link === "") {
      return;
    }

    const pattern = new RegExp("^(http[s]?|ftp)://");

    if (!pattern.test(link)) {
      link = "http://" + link;
    }

    window.open(link);
  }

  proceedStatusUpdate(event) {
    console.log("event==> ", event);
    this.showDialog = false;

    if (!event.continue) {
      return
    }

    // TODO: Make it localisable.
    this.infoMessage = "Success";
    this.messageInfo = "success";
    this.showLoader = true;
    this.service.statusUpdate(this.companyStatusUpdate).subscribe(
      (data: any) => {
        this.fetchCompanyList();
        this.companyStatusUpdate = {};
        this.toastService.show(this.translateService.instant("common.updated_successfully"), {
          autohide: true,
          info: 'success',
          headertext: this.translateService.instant("common.success")
        }
        );
      },
      error => {
        this.showLoader = false;
        this.companyStatusUpdate = {};
      }
    );

  }
}