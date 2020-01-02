import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  host: { '[class.ngb-toasts]': 'true' }
})
export class ToasterComponent {

  showToast = false;

  constructor(public toastService: ToastService) { }

  ngOnInit() { }

  isTemplate(toast) {
    let textOrTpl = toast.textOrTpl instanceof TemplateRef;
    if (!toast.show && toast.autohide) {
      toast.show = true;
      setTimeout(() => {
        this.toastService.remove(toast);
      }, toast.delay);
    }
    return textOrTpl;
  }

}
