import { TestBed } from '@angular/core/testing';

import { ParentChildCommuteService } from './parent-child-commute.service';

describe('ParentChildCommuteService', () => {
  let service: ParentChildCommuteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentChildCommuteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
