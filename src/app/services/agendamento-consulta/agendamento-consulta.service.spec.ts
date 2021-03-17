import { TestBed } from '@angular/core/testing';

import { AgendamentoConsultaService } from './agendamento-consulta.service';

describe('AgendamentoConsultaService', () => {
  let service: AgendamentoConsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendamentoConsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
