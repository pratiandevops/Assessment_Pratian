import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAssessment } from 'src/app/models/IAssessment';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { IAssessmentDetails } from 'src/app/models/IAssessmentDetails';
import { IAssessmentSubmision } from 'src/app/models/IAssessmentSubmision';

@Injectable({
  providedIn: 'root'
})
export class AssessmentServiceService {
  constructor(private http: HttpClient) { }
  public getAssessmentData(email:string): Observable<any> {
    console.log(email);
    return this.http.get<any>(`${environment.assessmentURL}/api/Assesment/GetAssesments?UserID=${email}`)
      .pipe(map((response: any) => response));
  }

  public getAssessmentDetailsByID(id: string): Observable<IAssessmentDetails> {
    return this.http.get<IAssessmentDetails>(`${environment.assessmentURL}/api/Question?AssesmentID=${id}`)
      .pipe(map((response: IAssessmentDetails) => response as IAssessmentDetails));
  }
  
  public submitAssessment(assessment: IAssessmentSubmision): Observable<number> {
    return this.http.post<number>(`${environment.assessmentURL}/api/Question`, assessment)
      .pipe(map((response: number) => response as number));
  }

}