import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/models/config';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { Option } from 'src/app/models/option';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  config: Config = { 
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: 100 // set this number due to the restriction of current API plan
  };

  sortOptions: Option[] = [
    { name: "Date", value: 'publishedAt' },
    { name: "Popularity", value: 'popularity' },
    { name: "Relevancy", value: 'relevancy' },
  ];

  constructor(private route: ActivatedRoute, public mainService: MainService) { }

  ngOnInit() {
    this.pageChanged(this.route.snapshot.paramMap.get('number'));
    this.mainService.getResult();
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }
}
