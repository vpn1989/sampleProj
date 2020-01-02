import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
  animations: [
    trigger("dialog", [
      transition("void => *", [
        style({ transform: "scale3d(.3, .3, .3)" }),
        animate(100)
      ]),
      transition("* => void", [
        animate(100, style({ transform: "scale3d(.0, .0, .0)" }))
      ])
    ])
  ]
})
export class DialogComponent implements OnInit, OnChanges {
  @Input() closable = true;
  @Input() template = false;
  @Input() message = "Info!";
  @Input() info = "info"; // success, warn, error, info
  @Input() visible: boolean;
  @Output() closeCallBack: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.visible) {
      const body = document.body;
      body.style.overflow = "hidden";
      body.style.paddingRight = "0px"; // padding-right: 17px;
    }
  }

  close() {
    this.visible = false;
    if (document.body.style.removeProperty) {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("padding-right");
    }
    this.closeCallBack.emit({ continue: false });
  }

  proceed() {
    this.visible = false;
    if (document.body.style.removeProperty) {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("padding-right");
    }
    this.closeCallBack.emit({ continue: true });
  }
}
