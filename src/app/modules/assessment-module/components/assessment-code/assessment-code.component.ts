import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CompilerService} from '../../services/compiler.service';

@Component({
  selector: 'app-assessment-code',
  templateUrl: './assessment-code.component.html',
  styleUrls: ['./assessment-code.component.css']
})
export class AssessmentCodeComponent implements OnInit {
  

  constructor(private aRouter: ActivatedRoute, private compilerService: CompilerService) { }
  languages = [  {text: 'C++', value: 'cpp'},
  {text: 'C#', value: 'csharp'},
  {text: 'Java', value: 'java'},
  {text: 'Python', value: 'python'}];

  selectedLanguage: string = 'csharp';

  currentTime:string = '00:00:00';

  editorOptions = {theme: 'vs-dark', language: this.selectedLanguage};
  code: string= '';
  output:string[] = [];

  ngOnInit() {
    this.startTimer(10);
  }

  changeLanguage(){
    this.editorOptions = {theme: 'vs-dark', language: this.selectedLanguage};
  }

  startTimer(counter){
      let counterInterval: any = setInterval(() => {
      this.currentTime = this.convertSecToClock(counter);
      if (counter === -1) {
        this.submitCode();
        clearInterval(counterInterval);
        this.currentTime = this.convertSecToClock(0);
      }
      counter--;
    }, 1000);
  }

  runTestCases(){
    let input: string = '1';
    let output: string ='';
    switch(this.selectedLanguage){
      case 'cpp':{
        this.compilerService.ccompiler(this.code,input).subscribe((data:any)=>{
          output = data;
        });
        break;
      }
      case 'csharp':{
        this.compilerService.csharpcompiler(this.code,input).subscribe((data:any)=>{
          output = data;
          this.printOutput(data);
          console.log(data);
        });
        break;
      }
      case 'java':{
        this.compilerService.jcompiler(this.code,input).subscribe((data:any)=>{
          output = data;
        });
        break;
      }
      case 'python':{
        this.compilerService.pcompiler(this.code,input).subscribe((data:any)=>{
          output = data;
        });
        break;
      }
    }
  }

  printOutput(output){
    if(output.error){
      this.output.push(output.error);
    }
    if(output.output){
      this.output.push(output.output);
    }
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
