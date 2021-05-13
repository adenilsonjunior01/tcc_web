import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaConsultaPacienteComponent } from './nova-consulta-paciente.component';

describe('NovaConsultaPacienteComponent', () => {
  let component: NovaConsultaPacienteComponent;
  let fixture: ComponentFixture<NovaConsultaPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NovaConsultaPacienteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaConsultaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
