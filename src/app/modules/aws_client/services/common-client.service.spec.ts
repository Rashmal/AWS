import { TestBed } from '@angular/core/testing';

import { CommonClientService } from './common-client.service';

describe('CommonClientService', () => {
  let service: CommonClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
