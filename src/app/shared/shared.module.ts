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
import { FormsModule } from "@angular/forms";

import { TopNavigationComponent } from "./top-navigation/top-navigation.component";
import { FooterComponent } from "./footer/footer.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { RouterModule } from "@angular/router";
import { NoDataFoundComponent } from "./no-data-found/no-data-found.component";
import { SideNavigationComponent } from "./side-navigation/side-navigation.component";
import { SideMenuService } from "./services/side-menu.service";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "/blueprint/assets/i18n/", ".json");
}

const translationOptions = {
  loader: {
    provide: TranslateLoader,
    useFactory: createTranslateLoader,
    deps: [HttpClient]
  }
};

@NgModule({
  declarations: [
    TopNavigationComponent,
    FooterComponent,
    NotFoundComponent,
    NoDataFoundComponent,
    SideNavigationComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule.forRoot(translationOptions),
    FormsModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    TopNavigationComponent,
    FooterComponent,
    FormsModule,
    NotFoundComponent,
    NoDataFoundComponent,
    SideNavigationComponent
  ],
  providers: [TranslateService, SideMenuService],
  entryComponents: [],
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
