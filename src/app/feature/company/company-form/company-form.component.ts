import { Component, OnInit } from "@angular/core";
import { Company } from "../../shared/models/company";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { CompanyService } from "../shared/company.service";
import { switchMap, isEmpty } from "rxjs/operators";
import { of, from } from "rxjs";
import { DbServerData } from '../../shared/models/db-server-data';
import { DataService, Status } from '../../shared/services/data-service.service';
import { Account } from "../../shared/models/account";
import { FileDimension } from "src/app/shared/services/file-processing.service";
import { FileDimensionValidatorService } from 'src/app/shared/validators/file-dimension-validator.service';

@Component({
  selector: "app-company-form",
  templateUrl: "./company-form.component.html",
  styleUrls: ["./company-form.component.scss"]
})

export class CompanyFormComponent implements OnInit {
  company: Company;
  dbservers: DbServerData[] = [];
  EditForm: FormGroup;
  showLoader = false;
  submitted = false;
  companyEditing = false;
  currentCompanyID: number;
  account: Account;
  accountRequest: any = {};

  logoImageAcceptMimes = ["image/jpeg", "image/png", "image/svg+xml"];
  logoDimension: FileDimension = { minWidth: 80, maxWidth: 400, minHeight: 30, maxHeight: 200 };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CompanyService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private dimensionValidatorService: FileDimensionValidatorService
  ) { }

  ngOnInit() {
    let id: number;
    if (this.router.url.match("account-request/")) {
      this.route.paramMap
        .pipe(switchMap((params: ParamMap) => of(params.get("id"))))
        .subscribe(d => (id = Number(d) || 0));

      this.setFormController();
      this.showServerSelector();
      if (id && id !== 0) {
        this.accountRequest.AccountRequestID = id;
        // this.getAccountData(id);
      }
    } else {
      this.route.paramMap
        .pipe(switchMap((params: ParamMap) => of(params.get("id"))))
        .subscribe(d => (id = Number(d) || 0));

      if (id && id !== 0) {
        this.companyEditing = true;
        this.setFormController();
        this.showServerSelector();

        this.disableUserDetailsUpdate()
        this.getCompanyData(id);
        this.currentCompanyID = id;
      } else {
        this.setFormController();
        this.showServerSelector();
      }
    }
  }

  // Public Methods
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.EditForm.invalid) {
      return;
    }

    if (this.companyEditing) {
      this.updateCompany();

      return
    }

    this.createCompany();
  }

  get f() {
    return this.EditForm.controls;
  }

  // Private Methods
  private getAccountData(id: number) {
    if (id) {
      const request = {
        ID: id
      };

      this.showLoader = true;
      this.service.getAccountData(request).subscribe(
        (data: any) => {
          this.account = data.Accounts[0];

          this.setAccountFormController(this.account);
          this.showLoader = false;
        },
        error => {
          this.setAccountFormController();
          this.showLoader = false;
        }
      );
    }
  }

  private setAccountFormController(account: Account = null) {
    console.log("account ==> ", account);
    if (account === null) {
      account = this.defaultAccountData();
    }

    this.EditForm = this.formBuilder.group({
      companyName: [account.Company, Validators.required],
      companyEmail: [account.Email, Validators.required],
      companyCode: [null, Validators.required],
      companyAddress: [null, Validators.required],
      companyWebAddress: [null],
      companyDBTypeOptionSelector: [null, Validators.required],
      companyDBOptionSelector: [null, Validators.required],
      companyServerName: [null, Validators.required],
      companyServerInput: [null, Validators.required],
      companyDBServerIP: [null, Validators.required],
      companyDBServerID: [null, Validators.required],
      companyDBServerPassword: [null],
      companyCorporateUserName: [account.Name],
      companyCorporatePassword: [null],
      companyDomainName: [null],
      companylogo: ["", [Validators.required, this.dimensionValidatorService.dimensionValidator(this.logoDimension)]]
    });

    if (!this.companyEditing) {
      this.EditForm.get('companyCorporateUserName').setValidators([Validators.required])
      this.EditForm.get('companyCorporatePassword').setValidators([Validators.required])
    }
  }

  private defaultAccountData(): Account {
    return {
      ID: 0,
      Name: "",
      Company: "",
      Email: "",
      Message: "",
      PhoneNumber: ""
    };
  }

  private createCompany() {
    this.showLoader = true;
    this.service.createCompanyWith(this.currentCompanyData()).subscribe(
      (response: any) => {
        if (this.router.url.match("account-request/")) {
          this.updateAccountStatus();
        } else {
          this.router.navigate(["/company"]);
        }
      },
      error => {
        this.showLoader = false;
      }
    )
  }

  private updateCompany() {
    this.showLoader = true;
    this.service.updateCompanyWith(this.currentCompanyData(), this.currentCompanyID).subscribe(
      (response: any) => {
        this.router.navigate(["/company/update"]);
      },
      error => {
        this.showLoader = false;
      }
    )
  }

  private updateAccountStatus() {
    const request = {
      AccountRequestID: this.accountRequest.AccountRequestID,
      RequestStatusID: Status.Accepted
    };
    this.dataService.statusUpdate(request).subscribe(
      (data: any) => {
        this.accountRequest = {};
        this.navigateToAccount();
      },
      error => {
        this.accountRequest = {};
      }
    );
  }

  private navigateToAccount() {
    this.router.navigate(["/account-request"]);
  }

  private showServerSelector(request: any = {}) {
    if (this.dbservers.length === 0) {
      this.EditForm.get('companyDBOptionSelector').disable();
    }

    /// request for server details 
    this.service.getCloudServerData(request).subscribe(
      (response: any) => {
        this.EditForm.get('companyDBOptionSelector').enable();
        this.dbservers = response.CompanyDBServer;
      },
      error => {
      }
    )
  }

  private disableUserDetailsUpdate() {
    this.EditForm.get('companyCorporatePassword').disable();
    this.EditForm.get('companyCorporateUserName').disable();
    this.EditForm.get('companyDomainName').disable();
  }

  private getCompanyData(id: number) {
    if (id) {
      const request = {
        CompanyID: id
      };

      this.showLoader = true;
      this.service.getCompanyData(request).subscribe(
        (data: any) => {
          this.company = data.Companies[0];
          // this.setFormController(this.company);
          this.setFormControllerforUpdate(this.company);
          this.showLoader = false;
        },
        error => {
          this.setFormController();
          this.showLoader = false;
        }
      );
    }
  }
  private setFormControllerforUpdate(company: Company = null) {
    if (company === null) {
      company = this.defaultCompanyData();
    } else {
      this.companyEditing = true
    }

    this.EditForm = this.formBuilder.group({
      companyName: [company.CompanyName, Validators.required],
      companyCode: [company.CompanyCode, Validators.required],
      companyAddress: [company.CompanyAddress, Validators.required],
      companyEmail: [company.CompanyEmail, Validators.email],
      companyPhoneNumber: [company.PhoneNumber, Validators.required],
      companyWebAddress: [company.CompanyWebsite],
      companyCorporateUserName: [""],
      companyCorporatePassword: [""],
      companyDBTypeOptionSelector: [company.SolutionTypeID, Validators.required],
      companyDBOptionSelector: [company.CompanyDBServerID, Validators.required],
      companyDatabaseName: [company.CompanyDBName, Validators.required],
      companyScheme: [company.CompanyDBSchema, Validators.required],
      companyDomainName: [company.CompanyUsersDomain, Validators.required],
      companylogo: [company.LogoURL ? { url: company.LogoURL } : "", [Validators.required, this.dimensionValidatorService.dimensionValidator(this.logoDimension)]]
    });

    if (!this.companyEditing) {
      this.EditForm.get('companyCorporateUserName').setValidators([Validators.email])
      this.EditForm.get('companyCorporatePassword').setValidators([Validators.required])
    }
  }

  private setFormController(company: Company = null) {
    if (company === null) {
      company = this.defaultCompanyData();
    } else {
      this.companyEditing = true
    }

    this.EditForm = this.formBuilder.group({
      companyName: [company.CompanyName, Validators.required],
      companyCode: [company.CompanyCode, Validators.required],
      companyAddress: [company.CompanyAddress, Validators.required],
      companyEmail: [company.CompanyEmail, Validators.email],
      companyPhoneNumber: [company.PhoneNumber, Validators.required],
      companyWebAddress: [company.CompanyWebsite],
      companyCorporateUserName: [company.UserName],
      companyCorporatePassword: [company.UserPassword],
      companyDBTypeOptionSelector: [company.SolutionTypeID, Validators.required],
      companyDBOptionSelector: [company.CompanyDBServerID, Validators.required],
      companyDatabaseName: [company.CompanyDBName, Validators.required],
      companyScheme: [company.CompanyDBSchema, Validators.required],
      companyDomainName: [company.CompanyUsersDomain, Validators.required],
      companylogo: [company.LogoURL ? { url: company.LogoURL } : "", [Validators.required, this.dimensionValidatorService.dimensionValidator(this.logoDimension)]]
    });

    if (!this.companyEditing) {
      this.EditForm.get('companyCorporateUserName').setValidators([Validators.email])
      this.EditForm.get('companyCorporatePassword').setValidators([Validators.required])
    }
  }

  private defaultCompanyData(): Company {
    return {
      CompanyID: 0,
      CompanyCode: "",
      CompanyName: "",
      CompanyEmail: "",
      CompanyAddress: "",
      CompanyWebsite: "",
      CompanyDBSchema: "",
      CompanyDBName: "",
      PhoneNumber: "",
      SolutionTypeID: null,
      CompanyDBServerID: null,
      UserName: "",
      UserPassword: "",
      UserEmail: "",
      CompanyUsersDomain: "",
      IsDeleted: true,
      PageNumber: 0,
      PageSize: 10,
      LogoURL: ""
    };
  }

  private currentCompanyData() {
    const request = {
      CompanyCode: this.EditForm.value.companyCode,
      CompanyName: this.EditForm.value.companyName,
      CompanyAddress: this.EditForm.value.companyAddress,
      CompanyEmail: this.EditForm.value.companyEmail,
      CompanyWebsite: this.EditForm.value.companyWebAddress,
      PhoneNumber: this.EditForm.value.companyPhoneNumber,
      UserName: this.EditForm.value.companyCorporateUserName,
      UserEmail: this.EditForm.value.companyCorporateUserName,
      UserPassword: this.EditForm.value.companyCorporatePassword,
      CompanyUsersDomain: this.EditForm.value.companyDomainName,
      CompanyDBName: this.EditForm.value.companyDatabaseName,
      CompanyDBSchema: this.EditForm.value.companyScheme,
      CompanyDBServerID: parseInt(this.EditForm.value.companyDBOptionSelector),
      SolutionTypeID: this.EditForm.value.companyDBTypeOptionSelector,
      file: this.EditForm.value.companylogo && this.EditForm.value.companylogo.length ? this.EditForm.value.companylogo[0].file : ""
    };

    const formData = new FormData();
    for (const key in request) {
      if (request.hasOwnProperty(key)) {
        formData.append(key, request[key]);
      }
    }
    return formData;
  }
  get formValue() {
    return this.EditForm.value;
  }
}
