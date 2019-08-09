import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  apiKey: string = '8eb2b92652744080b60b1fdac0cddbbd';
  baseUrl: string = 'https://newsapi.org/v2/everything?q=bitcoin&from=2019-07-09&sortBy=publishedAt&apiKey=';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getResult() {
    this.http.get(this.baseUrl + this.apiKey).subscribe(response => {
      console.log(response);
    });
  }

}
