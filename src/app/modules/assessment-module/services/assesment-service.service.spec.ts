import { TestBed } from '@angular/core/testing';

import { AssesmentServiceService } from './assesment-service.service';

describe('AssesmentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssesmentServiceService = TestBed.get(AssesmentServiceService);
    expect(service).toBeTruthy();
  });
});
