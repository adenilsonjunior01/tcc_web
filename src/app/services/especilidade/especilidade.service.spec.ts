import { TestBed } from '@angular/core/testing';

import { EspecilidadeService } from './especilidade.service';

describe('EspecilidadeService', () => {
  let service: EspecilidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspecilidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
