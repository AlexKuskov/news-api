import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { Option } from 'src/app/models/option';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  sortOptions: Option[] = [
    { name: "Date", value: 'publishedAt' },
    { name: "Popularity", value: 'popularity' },
    { name: "Relevancy", value: 'relevancy' },
  ];

  constructor(private route: ActivatedRoute, private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.pageChanged(this.route.snapshot.paramMap.get('number'));
  }

  pageChanged(event: any) {
    if (!event) event = 1;
    this.mainService.config.currentPage = event;
    this.mainService.currentPage = event;
    this.router.navigate(['/page/', event]);

    this.mainService.updateParameters();
  }
}
