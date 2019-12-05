import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAssessment } from 'src/app/models/IAssessment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssessmentServiceService {
  constructor(private http: HttpClient) { }
  public getAssessmentData(): Observable<IAssessment> {
    return this.http.get<IAssessment>("assets/json/Assessment.json")
      .pipe(map((response: IAssessment) => response as IAssessment));
  }
}