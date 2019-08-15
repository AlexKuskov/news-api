import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response';
import { Config } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class MainService {
 
  config: Config = { 
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: 100 // set this number due to the restriction of current API plan
  };
  
  response: Response = new Response();
  isResultReturned: boolean = false;

  queryParameter: string = '&q=';
  languageParameter: string = 'language=';
  sortByParameter: string = '&sortBy=';
  pageParameter: string = '&page=';
  apiKeyParameter: string = '&apiKey='

  q: string;
  date: Date[];
  selectedLanguage: string = 'en';
  selectedSortMethod: string = 'publishedAt';
  currentPage: string = '1';
  apiKey: string = 'faf3ae3e883e44fd922e5bf2f9522b50';

  baseUrl: string = 'https://newsapi.org/v2/everything?';
  parameters: string = this.languageParameter + this.selectedLanguage +
                       this.sortByParameter + this.selectedSortMethod +
                       this.pageParameter + this.currentPage +
                       this.apiKeyParameter + this.apiKey +
                       (this.q ? this.queryParameter + this.q : '&domains=techcrunch.com,engadget.com') +
                       (this.date ? this.getConvertDate() : '');
  customUrl: string;

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
    this.customUrl = this.baseUrl + this.parameters;
    this.http.get<Response>(this.customUrl).subscribe(response => {
      this.response = response;
      this.isResultReturned = true;

      this.config.totalItems = response.totalResults < 100 ? response.totalResults : 100;
    });
  }

  updateParameters() {
    this.isResultReturned = false;
    this.parameters = this.languageParameter + this.selectedLanguage +
                      this.sortByParameter + this.selectedSortMethod +
                      this.pageParameter + this.currentPage +
                      this.apiKeyParameter + this.apiKey +
                      (this.q ? this.queryParameter + this.q : '&domains=techcrunch.com,engadget.com') +
                      (this.date ? this.getConvertDate() : '');
                  
    this.getResult();
  }
}
