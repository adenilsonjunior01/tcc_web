import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieEspecialidadesPacienteComponent } from './pie-especialidades-paciente.component';

describe('PieEspecialidadesPacienteComponent', () => {
  let component: PieEspecialidadesPacienteComponent;
  let fixture: ComponentFixture<PieEspecialidadesPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieEspecialidadesPacienteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieEspecialidadesPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
