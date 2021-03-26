import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProntuarioMedicoPacienteComponent } from './prontuario-medico-paciente.component';

describe('ProntuarioMedicoPacienteComponent', () => {
  let component: ProntuarioMedicoPacienteComponent;
  let fixture: ComponentFixture<ProntuarioMedicoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProntuarioMedicoPacienteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProntuarioMedicoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
