import { Component, OnInit, Input } from '@angular/core';
import { IAssessment } from 'src/app/models/IAssessment';

@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  assessment:IAssessment
  constructor() { }

  ngOnInit() {
  }

}
