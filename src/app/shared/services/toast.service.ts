import { Injectable, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];

  constructor(private translateService: TranslateService) { }

  /* Push new Toasts to array with content and options 
  *  options: {
  *       delay?: number, 
  *       autohide: boolean, 
  *       info?: string, (default: 'danger' //'danger, warning, success')
  *       headertext: string
  *     }
  */

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {

    // customizing for default error message
    options.toastId = this.toasts.length + 1;
    options.show = false;
    options.delay = (options.delay) ? options.delay : 3000;
    options.classname = 'toast show';
    options.info = (options.info) ? options.info : 'danger';
    options.headertext = (options.headertext) ? options.headertext : this.translateService.instant("common.error_head");
    this.toasts.push({ textOrTpl, ...options });
  }

  // Callback method to remove Toast element from view.
  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
