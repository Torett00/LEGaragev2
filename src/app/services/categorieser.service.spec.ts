import { TestBed } from '@angular/core/testing';

import { CategorieserService } from './categorieser.service';

describe('CategorieserService', () => {
  let service: CategorieserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
