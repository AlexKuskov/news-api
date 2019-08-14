import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {
 
  response: Response = new Response();

  queryParameter: string = '&q=';
  languageParameter: string = 'language=';
  sortByParameter: string = '&sortBy=';
  pageParameter: string = '&page=';
  apiKeyParameter: string = '&apiKey='

  q: string;
  date: Date[];
  selectedLanguage: string = 'en';
  selectedSortMethod: string = 'publishedAt';
  currentPage: string = '1'; //TODO: add currentPage refresh
  apiKey: string = 'faf3ae3e883e44fd922e5bf2f9522b50';

  baseUrl: string = 'https://newsapi.org/v2/everything?'
  parameters: string = this.languageParameter + this.selectedLanguage +
                       this.sortByParameter + this.selectedSortMethod +
                       this.pageParameter + this.currentPage +
                       this.apiKeyParameter + this.apiKey +
                       (this.q ? this.queryParameter + this.q : '') +
                       (this.date ? this.getConvertDate() : '');
  customUrl: string = this.baseUrl + this.parameters;

  constructor(private http: HttpClient) { }

  getConvertDate(): string {
    let datePipe: DatePipe = new DatePipe('en-US');
    let dateFromParameter: string = '&from=';
    let dateToParameter: string = '&to=';

    dateFromParameter += datePipe.transform(this.date[0], 'yyyy-MM-dd');
    dateToParameter += datePipe.transform(this.date[1], 'yyyy-MM-dd');
    
    return dateFromParameter + dateToParameter;
  }

  getResult() {
    this.http.get<Response>(this.customUrl).subscribe(response => {
      this.response = response;
    });
  }
}
