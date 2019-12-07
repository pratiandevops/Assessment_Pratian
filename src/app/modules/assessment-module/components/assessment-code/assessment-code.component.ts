import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CompilerService} from '../../services/compiler.service';
import { AssessmentServiceService} from '../../services/assessments.service';

@Component({
  selector: 'app-assessment-code',
  templateUrl: './assessment-code.component.html',
  styleUrls: ['./assessment-code.component.css']
})
export class AssessmentCodeComponent implements OnInit {
  constructor(private aRouter: ActivatedRoute, private compilerService: CompilerService,
    private assessmentService: AssessmentServiceService, private router: Router) { }

    @ViewChild('openModal', {static: true}) openModal: ElementRef;
    @ViewChild('landingModal', {static: true}) landingModal: ElementRef;

  languages = [  {text: 'C++', value: 'cpp'},
  {text: 'C#', value: 'csharp'},
  {text: 'Java', value: 'java'},
  {text: 'Python', value: 'python'}];
  selectedLanguage = 'csharp';
  currentTime = '00:00:00';
  editorOptions = {theme: 'vs-dark', language: this.selectedLanguage};
  code: string;
  output: string[] = [];
  question: any = {};
  isSubmitAnswerEnabled = false;
  NumberOfTestCasesPassed = 0;

  ngOnInit() {
    this.landingModal.nativeElement.click();
  }

  getQuestionDetails(id){
    this.assessmentService.getAssessmentDetailsByID(id).subscribe((data)=>{   
      this.question = data[0];
      this.startTimer(this.question.TimeInMinutes * 60);
    });
  }

  changeLanguage(){
    this.editorOptions = {theme: 'vs-dark', language: this.selectedLanguage};
  }

  startTimer(counter){
      const counterInterval: any = setInterval(() => {
      this.currentTime = this.convertSecToClock(counter);
      if (counter === -1) {
        this.submitCode();
        clearInterval(counterInterval);
        this.currentTime = this.convertSecToClock(0);
      }
      counter--;
    }, 1000);
  }

  // TestValues= [
  //   {
  //     TestValueID: 1,
  //     Inputs: '1',
  //     OutPut: 'one'
  //   },
  //   {
  //     TestValueID: 2,
  //     Inputs: '2',
  //     OutPut: 'two'
  //   }
  // ];

  async runTestCases() {
    this.NumberOfTestCasesPassed = 0;
    this.question.TestValues.forEach(async element => {
      await this.runTestCase(element);
    });
    // this.TestValues.forEach(async element => {
    //   await this.runTestCase(element);
    // });
  }

  async runTestCase(element) {
    switch(this.selectedLanguage) {
      case 'cpp': {
        (async (element) => {
          const data = await this.compilerService.ccompiler(this.code, element.Inputs).toPromise();
          this.printOutput(data, element);
        })(element);
        break;
      }
      case 'csharp':{
        (async (element) => {
          const data = await this.compilerService.csharpcompiler(this.code, element.Inputs).toPromise();
          this.printOutput(data, element);
        })(element);
        break;
      }
      case 'java':{
        (async (element) => {
          const data = await this.compilerService.jcompiler(this.code, element.Inputs).toPromise();
          this.printOutput(data, element);
        })(element);
        break;
      }
      case 'python':{
        (async (element) => {
          const data = await this.compilerService.pcompiler(this.code, element.Inputs).toPromise();
          this.printOutput(data, element);
        })(element);
      }
    }
  }

  printOutput(output, element) {
    if (output.error) {
      this.output.unshift(output.error);
    }
    if (output.output) {
      if (element.OutPut.trim() === output.output.trim()) {
        this.output.unshift(`Input - ${element.Inputs}, Output - ${output.output}, Testcase passed`);
        this.NumberOfTestCasesPassed++;
      } else {
        this.output.unshift(`Testcase failed`);
      }
    }
  }

  submitCode() {
    this.openModal.nativeElement.click();
    this.assessmentService.submitAssessment({
      NumberOfTestCasesPassed: this.NumberOfTestCasesPassed,
      NumberOfTestCasesGiven: this.question.TestValues.length,
      AssesmentID: this.question.AssesmentID,
      AssesmentKey: '',
      UserUniqueID: sessionStorage.getItem('username')
    }).subscribe((data) => {
        this.isSubmitAnswerEnabled = true;
    });
  }

  closeAssessment() {
    this.router.navigate(['/assessment']);
  }

  closeLandingModal() {
    const id = this.aRouter.snapshot.paramMap.get('id');
    this.landingModal.nativeElement.click();
    this.getQuestionDetails(id);
  }

  convertSecToClock(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
