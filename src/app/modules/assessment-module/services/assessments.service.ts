import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAssessment } from 'src/app/models/IAssessment';
import { map } from 'rxjs/operators';
import { IAssessmentDetails } from 'src/app/models/IAssessmentDetails';
import { IAssessmentSubmision } from 'src/app/models/IAssessmentSubmision';

@Injectable({
  providedIn: 'root'
})
export class AssessmentServiceService {
  constructor(private http: HttpClient) { }
  public getAssessmentData(): Observable<IAssessment> {
    return this.http.get<IAssessment>("assets/json/Assessment.json")
      .pipe(map((response: IAssessment) => response as IAssessment));
  }

  public getAssessmentDetailsByID(id: number): Observable<IAssessmentDetails> {
    return this.http.get<IAssessmentDetails>("assets/json/Assessment.json")
      .pipe(map((response: IAssessmentDetails) => response as IAssessmentDetails));
  }
  
  public submitAssessment(assessment: IAssessmentSubmision): Observable<number> {
    return this.http.post<number>("assets/json/Assessment.json",assessment)
      .pipe(map((response: number) => response as number));
  }

}