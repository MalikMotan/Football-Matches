import { TestBed, inject } from '@angular/core/testing';

import { MatchService } from './match.service';

describe('MatchListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchService]
    });
  });

  it('should be created', inject([MatchService], (service: MatchService) => {
    expect(service).toBeTruthy();
  }));
});
