import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/models/config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  p: number = 1;
  config: Config = { 
    itemsPerPage: 20,
    currentPage: this.p,
    totalItems: 200 
  }; 
  response: Response = new Response();

  apiKey: string = 'faf3ae3e883e44fd922e5bf2f9522b50';
  baseUrl: string = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey='; //&from=2019-07-09&sortBy=publishedAt
  //baseUrl: string = 'https://newsapi.org/v2/everything?language=en&domains=techcrunch.com,nytimes.com&apiKey=';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.pageChanged(this.route.snapshot.paramMap.get('number'));
    this.getResult();
  }

  getResult() {
    this.http.get<Response>(this.baseUrl + this.apiKey).subscribe(response => {
      this.response = response;
    });
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

}
