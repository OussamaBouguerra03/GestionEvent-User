import { TestBed } from '@angular/core/testing';

import { ParticipatonService } from './participaton.service';

describe('ParticipatonService', () => {
  let service: ParticipatonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipatonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
