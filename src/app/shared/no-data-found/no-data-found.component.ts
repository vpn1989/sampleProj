import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-no-data",
  templateUrl: "./no-data-found.component.html",
  styleUrls: ["./no-data-found.component.scss"]
})
export class NoDataFoundComponent implements OnInit {
  @Input() message = "No data found";

  constructor() {}

  ngOnInit() {}
}
