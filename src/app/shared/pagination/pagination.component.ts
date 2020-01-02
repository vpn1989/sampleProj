import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from "@angular/core";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"]
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input()
  page: number;
  @Input()
  private maxPageSize: number;
  @Input()
  private collectionSize: number;

  @Output() nextPageEvent: EventEmitter<number> = new EventEmitter();

  noOfPagesList = [];

  constructor() {}

  ngOnInit() {
    this.calcNoOfPaginationCount();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calcNoOfPaginationCount();
  }

  calcNoOfPaginationCount() {
    if (this.collectionSize) {
      this.noOfPagesList = [];
      const noOfPages =
        Math.floor(this.collectionSize / this.maxPageSize) +
        (this.collectionSize % this.maxPageSize > 0 ? 1 : 0);
      for (let i = 0; i < noOfPages; i++) {
        this.noOfPagesList.push(i + 1);
      }
    }
  }

  currentPageNumber(page) {
    this.page = page;
    this.nextPageEvent.emit(this.page);
  }

  firstPage() {
    this.page = 1;
    this.nextPageEvent.emit(this.page);
  }

  previousPage() {
    this.page = this.page - 1;
    this.nextPageEvent.emit(this.page);
  }

  nextPage() {
    this.page = this.page + 1;
    this.nextPageEvent.emit(this.page);
  }

  lastPage() {
    this.page = this.noOfPagesList[this.noOfPagesList.length - 1];
    this.nextPageEvent.emit(this.page);
  }
}
