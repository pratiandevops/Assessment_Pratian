import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompilerService } from '../../services/compiler.service';
import { AssessmentServiceService } from '../../services/assessments.service';
import * as introJs from 'intro.js/intro.js';

@Component({
  selector: 'app-assessment-code',
  templateUrl: './assessment-code.component.html',
  styleUrls: ['./assessment-code.component.css']
})
export class AssessmentCodeComponent implements OnInit {
  constructor(
    private aRouter: ActivatedRoute,
    private compilerService: CompilerService,
    private assessmentService: AssessmentServiceService,
    private router: Router) { }

  @ViewChild('openModal', { static: true }) openModal: ElementRef;
  @ViewChild('landingModal', { static: true }) landingModal: ElementRef;
  @ViewChild('submissionModal', { static: true }) submissionModal: ElementRef;

  languages = [{ name: 'csharp', extn: 'cs' }, { name: 'cpp', extn: 'cpp' }, { name: 'java', extn: 'java' }, { name: 'python', extn: 'py' }];
  selectedLanguage = 'csharp';
  currentTime = '00:00:00';
  editorOptions = {
    theme: 'vs-dark',
    language: this.selectedLanguage,
    lineHeight: 20,
    fontSize: 18,
    wordWrap: "bounded",
    automaticLayout: true,
    wrappingIndent: 'indent'
  };
  code = `using System;
  namespace HelloWorldApp
  {
      class Praleso
      {
          static void Main(string[] args)
          {
               Console.WriteLine("Hello World");
          }
      }
  }`;
  output: string[] = [];
  question: any = {
    AssesmentName: 'Hello World',
    Description: 'Write a program to print Hello World'
  };
  NumberOfTestCasesPassed = 0;
  TotalTestCases = 0;
  isLoading = false;
  counter = 0;
  isCodeSubmitted = false;

  ngOnInit() {
    this.landingModal.nativeElement.click();
    // this.compilerService.getAllLanguages().subscribe((data) => {
    //   this.languages = data;
    // });
    window.onbeforeunload = function (event) {
      event.returnValue = 'Your custom message.';
    };
  }

  startDemo() {
    const intro = introJs();
    intro.onexit(() => {
      this.landingModal.nativeElement.click();
    });
    intro.start();
  }

  getQuestionDetails(id) {
    this.isLoading = true;
    this.assessmentService.getAssessmentDetailsByID(id).subscribe((data) => {
      this.question = data[0];
      this.startTimer(this.question.TimeInMinutes * 60);
      this.TotalTestCases = this.question.TestValues.length;
      this.isLoading = false;
      this.code = '';
    });
  }

  changeLanguage() {
    this.editorOptions = { theme: 'vs-dark', language: this.selectedLanguage,
    lineHeight: 20,
    fontSize: 18,
    wordWrap: "bounded",
    automaticLayout: true,
    wrappingIndent: 'indent' };
  }

  startTimer(counter) {
    const counterInterval: any = setInterval(() => {
      this.currentTime = this.convertSecToClock(counter);
      if (counter === -1) {
        this.submitCode();
        clearInterval(counterInterval);
        this.currentTime = this.convertSecToClock(0);
      }
      counter--;
      this.counter = counter;
    }, 1000);
  }


  async runTestCases() {
    this.NumberOfTestCasesPassed = 0;
    this.question.TestValues.forEach(element => {
      this.runTestCase(element);
    });
  }

  runTestCase(element) {
    this.isLoading = true;
    this.compilerService.glotCompiler(this.selectedLanguage,
      {
        stdin: element.Inputs,
        files: [
          {
            name: `main.${this.languages.filter(val => val.name === this.selectedLanguage)[0].extn}`,
            content: this.code
          }
        ]
      }).subscribe((data) => {
        this.printOutput(data, element);
        this.isLoading = false;
      }, (error) => {
        this.isLoading = false;
        let cerror = {
          error: error.error.message
        };
        this.printOutput(cerror, element);
      });
  }

  printOutput(output, element) {
    if (output.error !== '') {
      this.output.unshift(output.error);
    }
    if (output.stdout) {
      if (element.OutPut.trim() === output.stdout.trim()) {
        this.output.unshift(`Input - ${element.Inputs}, Output - ${output.stdout}, Testcase passed`);
        this.NumberOfTestCasesPassed++;
      } else {
        this.output.unshift(`Testcase failed`);
      }
      if (this.NumberOfTestCasesPassed === this.TotalTestCases) {
        this.output.unshift(`All ${this.TotalTestCases} Testcases are passed`);
      }
    }
  }

  confirmSubmisionCode() {
    this.submissionModal.nativeElement.click();
  }

  submitCode() {
    this.isLoading = true;
    this.assessmentService.submitAssessment({
      NumberOfTestCasesPassed: this.NumberOfTestCasesPassed,
      NumberOfTestCasesGiven: this.TotalTestCases,
      AssesmentID: this.question.AssesmentID,
      AssesmentKey: '',
      SubmittedCode: this.code,
      Factor: (parseFloat('1') / parseFloat((this.question.TimeInMinutes * 60).toString())).toString(),
      UserUniqueID: JSON.parse(localStorage.getItem('currentUser')).Email,
    }).subscribe((data) => {
      this.isLoading = false;
      this.openModal.nativeElement.click();
    });
  }

  submitCodeOnClick() {
    this.isLoading = true;
    this.assessmentService.submitAssessment({
      NumberOfTestCasesPassed: this.NumberOfTestCasesPassed,
      NumberOfTestCasesGiven: this.TotalTestCases,
      AssesmentID: this.question.AssesmentID,
      AssesmentKey: '',
      SubmittedCode: this.code,
      Factor: (parseFloat(this.counter.toString()) / parseFloat((this.question.TimeInMinutes * 60).toString())).toString(),
      UserUniqueID: JSON.parse(localStorage.getItem('currentUser')).Email,
    }).subscribe((data) => {
      this.isLoading = false;
      this.isCodeSubmitted = true;
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
