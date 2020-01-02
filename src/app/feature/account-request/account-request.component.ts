import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-request',
  templateUrl: './account-request.component.html',
  styleUrls: ['./account-request.component.scss']
})
export class AccountRequestComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goToActiveComponent(url) {
    this.router.navigate([url]);
  }

}
