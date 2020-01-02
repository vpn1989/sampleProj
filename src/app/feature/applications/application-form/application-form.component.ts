import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApplicationService } from "../shared/services/application.service";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  FileProcessingService,
  FileDetails,
  FileDimension
} from "src/app/shared/services/file-processing.service";
import { FileDimensionValidatorService } from 'src/app/shared/validators/file-dimension-validator.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-application-form",
  templateUrl: "./application-form.component.html",
  styleUrls: ["./application-form.component.scss"]
})
export class ApplicationFormComponent implements OnInit {
  applicationForm: FormGroup;
  applicationId: number;

  showDialog = false;
  industries: any;
  categories: any;
  applicationTypes: any;
  supportingApps: any;
  submitted: boolean;
  accessRightsJson = [];

  selectedIndustryId: string = "";
  selectedSupportedAppCodes: string = "";

  iconAcceptMimes = ["image/x-icon", "image/jpeg", "image/png", "image/svg+xml"];
  bannerImageAcceptMimes = ["image/jpeg", "image/png", "image/svg+xml"];
  screenshotsAcceptMimes = ["image/jpeg", "image/png", "image/svg+xml"];

  icon16FileDimension: FileDimension = { width: 16, height: 16 };
  icon32FileDimension: FileDimension = { width: 32, height: 32 };
  icon64FileDimension: FileDimension = { width: 64, height: 64 };
  icon128FileDimension: FileDimension = { width: 128, height: 128 };

  bannerDimension: FileDimension = { minWidth: 960, maxWidth: 1920, minHeight: 128, maxHeight: 600 };
  screenshotsDimension: FileDimension = { minWidth: 960, maxWidth: 1920, minHeight: 720, maxHeight: 1200 };

  configTextEditor = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "imageUpload",
        "blockQuote",
        "undo",
        "redo",
        "insertTable"
      ]
    }
  };

  appSummaryEditor = ClassicEditor;

  showLoading = false;


  constructor(
    private applicationService: ApplicationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private translateService: TranslateService,
    private dimensionValidatorService: FileDimensionValidatorService,
    private fileProcessingService: FileProcessingService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.applicationId = parseInt(params.id, 10);
      this.getApplicationDetails();
    });
  }

  getCategoriesList() {
    this.applicationForm.controls.categoryId.disable();
    this.applicationService.getAllCategories().subscribe(
      (data: any) => {
        this.categories = data;
        if (this.applicationForm.value.categoryId) {
          this.updateSelectedCategory();
        }
        this.applicationForm.controls.categoryId.enable();
      },
      () => {
        this.applicationForm.controls.categoryId.enable();
      }
    );
  }

  updateSelectedCategory() {
    throw new Error("Method not implemented.");
  }

  getIndustriesList() {
    this.applicationForm.controls.industryIds.disable();
    this.applicationService.getAllIndustries().subscribe(
      (data: any) => {
        this.industries = data;
        if (this.applicationForm.value.industryIds) {
          this.updateSelectedIndustries();
        }
        this.applicationForm.controls.industryIds.enable();
      },
      () => {
        this.applicationForm.controls.industryIds.enable();
      }
    );
  }

  getApplicationTypes() {
    this.applicationService.getApplicationTypes().subscribe(
      (data: any) => {
        this.applicationTypes = data;
      },
      () => {
      }
    );
  }

  getSupportingApplication() {
    this.applicationService.getSupportingApps().subscribe(
      (data: any) => {
        this.supportingApps = data;
      },
      () => {
      }
    );
  }

  updateSelectedIndustries() {
    throw new Error("Method not implemented.");
  }

  getApplicationDetails() {
    this.showLoading = true;
    if (this.applicationId) {
      this.applicationService.getApplicationById(this.applicationId).subscribe((data) => { this.initializeForm(data); });
    } else {
      this.initializeForm({
        appId: 0,
        code: "",
        name: "",
        categoryId: null,
        industryIds: "",
        appTypeCode: "",
        dependentAppIds: "",
        vendorId: 1,
        description: "",
        urlSuffix: "",
        summary: "",
        icon16: null,
        icon32: null,
        icon64: null,
        icon128: null,
        bannerImage: null,
        selectedIndustryIds: null,
        screenshots: []
      });
    }
  }

  initializeForm(applicationDetails) {
    this.applicationForm = this.formBuilder.group({
      appId: [applicationDetails.appId, Validators.required],
      code: [applicationDetails.code, Validators.required],
      name: [applicationDetails.name, Validators.required],
      categoryId: [applicationDetails.categoryId, Validators.required],
      vendorId: [applicationDetails.vendorId, Validators.required],
      industryIds: ["", Validators.required],
      appTypeCode: [applicationDetails.appTypeCode, Validators.required],
      dependentAppIds: [this.getDependentAppIds(applicationDetails.supportingApps)],
      accessRightsJson: [this.getAccessRights(applicationDetails.accessRights), Validators.required],
      selectedIndustryIds: [applicationDetails.industryIds, Validators.required],
      description: [applicationDetails.description, [Validators.required, Validators.maxLength(250)]],
      urlSuffix: [applicationDetails.urlSuffix],
      summary: [applicationDetails.summary, [Validators.required, Validators.minLength(3)]],
      icon16: [applicationDetails.icon16, [Validators.required, this.dimensionValidatorService.dimensionValidator(this.icon16FileDimension)]],
      icon32: [applicationDetails.icon32, [Validators.required, this.dimensionValidatorService.dimensionValidator(this.icon32FileDimension)]],
      icon64: [applicationDetails.icon64, [Validators.required, this.dimensionValidatorService.dimensionValidator(this.icon64FileDimension)]],
      icon128: [applicationDetails.icon128, [Validators.required, this.dimensionValidatorService.dimensionValidator(this.icon128FileDimension)]],
      bannerImage: [applicationDetails.bannerImage, [Validators.required, this.dimensionValidatorService.dimensionValidator(this.bannerDimension)]],
      screenshots: [applicationDetails.screenshots, [Validators.required, Validators.minLength(3), this.dimensionValidatorService.dimensionValidator(this.screenshotsDimension)]],
    });
    this.getCategoriesList();
    this.getApplicationTypes();
    this.getSupportingApplication();
    this.getIndustriesList();
    this.showLoading = false;
  }

  getDependentAppIds(supportingApps) {
    let dependentAppIds = [];
    if (supportingApps) {
      supportingApps.filter(supportingApp => {
        dependentAppIds.push(supportingApp.SupportingAppID);
      });
      return dependentAppIds;
    }
    return "";
  }

  getAccessRights(accessRights) {
    this.accessRightsJson = accessRights;
    return this.accessRightsJson;
  }

  onReady($event) {
    $event.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return {
        upload: () => {
          return loader.file.then((files: FileList) => new Promise((resolve) => {
            const fileDetailsPromise: Promise<FileDetails[]> =
              this.fileProcessingService.getFileDetails(files);
            fileDetailsPromise.then((fileDetailsResponse) => {
              resolve({
                default: fileDetailsResponse[0].base64StringFile
              });
            });
          }));
        }
      };
    };
  }

  onSubmit() {
    this.submitted = true;
    if (this.applicationId) {
      this.applicationForm.controls['industryIds'].setValue(this.applicationForm.value.selectedIndustryIds.toString().split(',').join('~'));
      this.applicationForm.controls['dependentAppIds'].setValue(this.applicationForm.value.dependentAppIds.toString().split(',').join('~'));
    }

    this.applicationForm.controls['accessRightsJson'].setValue(JSON.stringify(this.accessRightsJson));

    if (this.applicationForm.invalid) {
      console.log(this.applicationForm);
      return;
    }
    this.showLoading = true;
    this.applicationService.saveApplication(this.applicationForm.value).subscribe((data: any) => {
      this.showLoading = false;
      this.toastService.show(
        (this.applicationForm.value.appId ?
          this.translateService.instant("common.updated_successfully") :
          this.translateService.instant("common.saved_successfully")), {
        autohide: true,
        info: 'success',
        headertext: this.translateService.instant("common.success")
      }
      );
      this.router.navigate(["/applications"]);
    }, error => {
    });
  }

  get f() {
    return this.applicationForm.controls;
  }

  get formValue() {
    return this.applicationForm.value;
  }

  addItem(industryId) {
    this.applicationForm.controls['industryIds'].setValue(this.applicationForm.value.selectedIndustryIds.toString().split(',').join('~'));
  }

  addSupportItem(roles) {
    console.log(roles);
    this.applicationForm.controls['dependentAppIds'].setValue(this.applicationForm.value.dependentAppIds.toString().split(',').join('~'));
  }

  addRole() {
    this.showDialog = true;
  }

  closeCallBack() {
    this.showDialog = false;
  }

  roleDataUpdate(event) {
    this.closeCallBack();
    this.accessRightsJson = event;
    this.applicationForm.controls['accessRightsJson'].setValue(this.accessRightsJson);
    console.log("roleDataUpdate==> ", this.accessRightsJson, event);
  }

  deleteRoleById(index) {
    this.accessRightsJson.splice(index, 1);
  }

}
