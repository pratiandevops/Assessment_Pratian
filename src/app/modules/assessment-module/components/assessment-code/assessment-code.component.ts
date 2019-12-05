import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessment-code',
  templateUrl: './assessment-code.component.html',
  styleUrls: ['./assessment-code.component.css']
})
export class AssessmentCodeComponent implements OnInit {

  constructor() { }
  languages = [  {text: 'C++', value: 'cpp'},
  {text: 'C#', value: 'csharp'},
  {text: 'Java', value: 'java'},
  {text: 'Python', value: 'python'},
  {text: 'Javascript', value: 'javascript'},
  {text: 'Typescript', value: 'typescript'}];

  selectedLanguage: string = 'javascript';

  currentTime:string = '00:00:00';

  editorOptions = {theme: 'vs-dark', language: this.selectedLanguage};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';

  

  ngOnInit() {
    this.startTimer(10);
  }

  changeLanguage(){
    this.editorOptions = {theme: 'vs-dark', language: this.selectedLanguage};
  }

  startTimer(counter){
    let counterInterval = setInterval(() => {
      this.currentTime = this.convertSecToClock(counter);
      if(counter===-1){
        this.submitCode();
        clearInterval(counterInterval);
        this.currentTime = this.convertSecToClock(0);
      }
      counter--;
      
    }, 1000);
  }

  submitCode(){
    alert("code is submited");
  }

  convertSecToClock(totalSeconds){
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return `${hours<10 ? '0':''}${hours}:${minutes<10 ? '0':''}${minutes}:${seconds<10 ? '0':''}${seconds}`;
  }
}
