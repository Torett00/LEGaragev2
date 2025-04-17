import { TestBed } from '@angular/core/testing';

import { CureentUserService } from './cureent-user.service';

describe('CureentUserService', () => {
  let service: CureentUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CureentUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
