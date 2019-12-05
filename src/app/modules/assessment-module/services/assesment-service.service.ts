import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssesmentQuestion } from '../models/AssesmentQuestion';

@Injectable({
  providedIn: 'root'
})
export class AssesmentServiceService {

  constructor(private httpClient: HttpClient) { }

  // get Method
  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }

  // post method
  post<T>(url: string, data: any, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpEvent<T>> {
    return this.httpClient.post<T>(url, data, options);
  }

  getAssessmentQuestion(): Observable<AssesmentQuestion> {
    return this.httpClient.get<AssesmentQuestion>("assets/json/assesmentQuestions.json")
      .pipe(map((response: AssesmentQuestion) => response as AssesmentQuestion));
  }
  
}
