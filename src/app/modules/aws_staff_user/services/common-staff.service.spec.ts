import { TestBed } from '@angular/core/testing';

import { CommonStaffService } from './common-staff.service';

describe('CommonStaffService', () => {
  let service: CommonStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
