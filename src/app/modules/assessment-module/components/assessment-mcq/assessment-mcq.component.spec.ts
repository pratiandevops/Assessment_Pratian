import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentMcqComponent } from './assessment-mcq.component';

describe('AssessmentMcqComponent', () => {
  let component: AssessmentMcqComponent;
  let fixture: ComponentFixture<AssessmentMcqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentMcqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentMcqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
