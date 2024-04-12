import { TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';
import { HttpClientModule } from '@angular/common/http';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], 
      providers: []
    });
    service = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
