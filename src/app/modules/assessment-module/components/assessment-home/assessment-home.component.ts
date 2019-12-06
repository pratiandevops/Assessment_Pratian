import { Component, OnInit } from '@angular/core';
import { AssessmentServiceService } from '../../services/assessments.service';
import { Router } from '@angular/router';
import { IAssessment } from 'src/app/models/IAssessment';

@Component({
  selector: 'app-assessment-home',
  templateUrl: './assessment-home.component.html',
  styleUrls: ['./assessment-home.component.css']
})
export class AssessmentHomeComponent implements OnInit {

  assessments: any;
  constructor(private assessmentServiceService: AssessmentServiceService,
              private router: Router) { }

  ngOnInit() {
    this.assessmentServiceService.getAssessmentData().subscribe(data => {
      this.assessments = data;
    });
  }

  getAssessment(assessment:IAssessment){
    if(assessment.AssesmentType=="MCQ"){
      this.router.navigate(['/mcq',assessment.AssesmentID])
    }
    else{
      this.router.navigate(['/code',assessment.AssesmentID])
    }
  }

}
