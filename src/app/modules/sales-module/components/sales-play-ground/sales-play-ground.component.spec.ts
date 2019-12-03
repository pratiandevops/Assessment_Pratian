import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPlayGroundComponent } from './sales-play-ground.component';

describe('SalesPlayGroundComponent', () => {
  let component: SalesPlayGroundComponent;
  let fixture: ComponentFixture<SalesPlayGroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesPlayGroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPlayGroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
