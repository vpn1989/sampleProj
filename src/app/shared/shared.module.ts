import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  HttpClient,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateService } from "@ngx-translate/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { TopNavigationComponent } from "./top-navigation/top-navigation.component";
import { FooterComponent } from "./footer/footer.component";
import { LoadingComponent } from "./loading/loading.component";
import { ImagePreviewComponent } from "./image-preview/image-preview.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { RouterModule } from "@angular/router";
import { NoDataFoundComponent } from "./no-data-found/no-data-found.component";
import { DialogComponent } from "./dialog/dialog.component";
import { SideNavigationComponent } from "./side-navigation/side-navigation.component";
import { BackofficeCategoriesService } from "./services/backoffice-categories.service";
import { FileUploaderComponent } from "./file-uploader/file-uploader.component";
import { FileViewerComponent } from "./file-viewer/file-viewer.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { FileProcessingService } from "./services/file-processing.service";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FileDimensionValidatorService } from './validators/file-dimension-validator.service';
import { ToasterComponent } from './toaster/toaster.component';

@NgModule({
  declarations: [
    TopNavigationComponent,
    FooterComponent,
    LoadingComponent,
    ImagePreviewComponent,
    NotFoundComponent,
    NoDataFoundComponent,
    DialogComponent,
    SideNavigationComponent,
    FileUploaderComponent,
    FileViewerComponent,
    PaginationComponent,
    ConfirmDialogComponent,
    ToasterComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule.forChild({}),
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    NgSelectModule,
    TopNavigationComponent,
    FooterComponent,
    LoadingComponent,
    ImagePreviewComponent,
    ReactiveFormsModule,
    FormsModule,
    NotFoundComponent,
    NoDataFoundComponent,
    DialogComponent,
    SideNavigationComponent,
    FileUploaderComponent,
    FileViewerComponent,
    PaginationComponent,
    ConfirmDialogComponent,
    ToasterComponent
  ],
  providers: [TranslateService, BackofficeCategoriesService, FileProcessingService, FileDimensionValidatorService],
  entryComponents: [ImagePreviewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule {
  private defaultLocale = "en";

  constructor(private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.addLangs([this.defaultLocale]);
    translate.setDefaultLang(this.defaultLocale);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    const locale = localStorage.getItem("locale")
      ? localStorage.getItem("locale")
      : this.defaultLocale;
    translate.use(locale);
  }
}
