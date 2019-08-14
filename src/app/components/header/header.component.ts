import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  maxDate: Date = new Date();
  minDate: Date = new Date(this.maxDate.getFullYear(),  this.maxDate.getMonth() - 1, this.maxDate.getDate());
}
