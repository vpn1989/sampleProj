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
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
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
export class ConfirmDialogComponent implements OnInit {

  @Input() visible: boolean;
  @Input() message? = "common.delete_message"; // translate key
  @Output() closeCallBack: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.visible) {
      const body = document.body;
      body.style.overflow = "hidden";
      body.style.paddingRight = "0px"; // padding-right: 17px;
    }
  }

  proceed(status) {
    this.visible = false;
    if (document.body.style.removeProperty) {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("padding-right");
    }
    this.closeCallBack.emit({ continue: status });
  }

}
