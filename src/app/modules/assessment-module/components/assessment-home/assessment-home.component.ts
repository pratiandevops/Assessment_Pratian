import { Component, OnInit } from '@angular/core';
import { AssessmentServiceService } from '../../services/assessments.service';

@Component({
  selector: 'app-assessment-home',
  templateUrl: './assessment-home.component.html',
  styleUrls: ['./assessment-home.component.css']
})
export class AssessmentHomeComponent implements OnInit {

  assessments: any;
  constructor(private assessmentServiceService: AssessmentServiceService) { }

  ngOnInit() {
    this.assessmentServiceService.getAssessmentData().subscribe(data => {
      this.assessments = data;
    });
  }

}
