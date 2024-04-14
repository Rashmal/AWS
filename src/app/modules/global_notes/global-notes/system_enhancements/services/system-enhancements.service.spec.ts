import { TestBed } from '@angular/core/testing';

import { SystemEnhancementsService } from './system-enhancements.service';

describe('SystemEnhancementsService', () => {
  let service: SystemEnhancementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemEnhancementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
