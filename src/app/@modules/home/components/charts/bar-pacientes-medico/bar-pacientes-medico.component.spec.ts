import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarPacientesMedicoComponent } from './bar-pacientes-medico.component';

describe('BarPacientesMedicoComponent', () => {
  let component: BarPacientesMedicoComponent;
  let fixture: ComponentFixture<BarPacientesMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarPacientesMedicoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarPacientesMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
