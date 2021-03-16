import { TestBed } from '@angular/core/testing';

import { DadosMedicosService } from './dados-medicos.service';

describe('DadosMedicosService', () => {
  let service: DadosMedicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosMedicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
