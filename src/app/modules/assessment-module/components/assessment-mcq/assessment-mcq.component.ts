import { Component, OnInit } from '@angular/core';
import { AssesmentQuestion } from '../../models/AssesmentQuestion';
import { AssesmentServiceService } from '../../services/assesment-service.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-assessment-mcq',
  templateUrl: './assessment-mcq.component.html',
  styleUrls: ['./assessment-mcq.component.css']
})
export class AssessmentMcqComponent implements OnInit {

  private QuestionList: AssesmentQuestion[];

  
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    prevArrow:
      '<i class=\'fa fa-chevron-circle-left fa-4x\' style=\'cursor:pointer;position:absolute;top:40%;z-index:1;left:-75px;color:rgb(111,150,183);background: white;border-radius: 47px;\'></i>',
    nextArrow:
      '<i class=\'fa fa-chevron-circle-right fa-4x\' style=\'cursor:pointer;position:absolute;top:40%;z-index:1;right:-75px;color:rgb(111,150,183);background: white;border-radius: 47px;\'></i>',
    responsive: [
      {
        breakpoint: 1161,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  slideConfig2 = {
    slidesToShow: 15,
    slidesToScroll: 1,
    infinite: false,
    prevArrow:
      '<i class=\'fa fa-chevron-left\' style=\'cursor:pointer;position:absolute;top:20%;z-index:1;left:-3px;color:rgb(111,150,183);background: white;border-radius: 47px;\'></i>',
    nextArrow:
      '<i class=\'fa fa-chevron-right\' style=\'cursor:pointer;position:absolute;top:20%;z-index:1;right:-3px;color:rgb(111,150,183);background: white;border-radius: 47px;\'></i>',
    responsive: [
      {
        breakpoint: 1161,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  
  addSlide() {
    this.QuestionList.push();
  }

  removeSlide() {
    this.QuestionList.length = this.QuestionList.length - 1;
  }

  afterChange(e) {
    console.log('afterChange');
  }

  saveAndProcced() {
    debugger;
   console.log('Called save and procced');
 }
  constructor(private assesmentService: AssesmentServiceService) { }

  ngOnInit() {
    // getting the data
    this.getAssesmentQuestionList().subscribe(data => {
      this.QuestionList = data;
      console.log(this.QuestionList);
    });
  }

  // Method to get assesment question set
  getAssesmentQuestionList(): Observable<AssesmentQuestion[]>  {
    return Observable.of().map(o => JSON.stringify(o)); 
    //return this.assesmentService.get('tsv');
  }

}
