import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { NgForm } from '@angular/forms';
import { Option } from 'src/app/models/option';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchForm', {read: NgForm, static: false}) searchForm: NgForm;

  maxDate: Date = new Date();
  minDate: Date = new Date(this.maxDate.getFullYear(),  this.maxDate.getMonth() - 1, this.maxDate.getDate());

  languageOptions: Option[] = [
    { name: "News language", value: 'en' },
    { name: "English", value: 'en' },
    { name: "Russian", value: 'ru' },
    { name: "French", value: 'fr' },
    { name: "Spanish", value: 'es' },
    { name: "German", value: 'de' },
  ];

  constructor(public mainService: MainService) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.mainService.q = this.searchForm.form.value.query;
  }
}
