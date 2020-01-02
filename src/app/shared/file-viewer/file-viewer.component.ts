import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-file-viewer",
  templateUrl: "./file-viewer.component.html",
  styleUrls: ["./file-viewer.component.scss"]
})
export class FileViewerComponent implements OnInit {
  @Input() url: string;
  @Input() errClass: string;
  @Input() errMessage: string;
  @Input() roles: string[] = [];
  @Input() hideDeleteBtn = false;

  @Output() delete: EventEmitter<{ event: Event, url: string }> = new EventEmitter();

  imageSanitized: SafeResourceUrl;
  isValidImage = false;
  showDialog = false;
  screenImage: any;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.bypassSecurityTrustResourceUrl();
  }

  validImage() {
    return (this.isValidImage = (this.url.indexOf("data:image/") !== -1 || this.url.indexOf("/dam/") !== -1));
  }

  bypassSecurityTrustResourceUrl() {
    this.imageSanitized = this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.url
    );
  }

  deleteClicked($event, url: string) {
    this.delete.emit({
      event: $event,
      url
    });
  }

  previewImage(imageUrl) {
    this.showDialog = !this.showDialog;
    this.screenImage = imageUrl;
  }

  closeCallBack() {
    this.showDialog = !this.showDialog;
  }
}
