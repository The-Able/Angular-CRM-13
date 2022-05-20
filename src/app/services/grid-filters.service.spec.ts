import { TestBed } from '@angular/core/testing';

import { GridFiltersService } from './grid-filters.service';

describe('GridFiltersService', () => {
  let service: GridFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
