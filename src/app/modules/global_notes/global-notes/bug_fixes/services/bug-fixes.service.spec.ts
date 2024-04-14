import { TestBed } from '@angular/core/testing';

import { BugFixesService } from './bug-fixes.service';

describe('BugFixesService', () => {
  let service: BugFixesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BugFixesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
