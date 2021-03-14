import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesPacienteHomeComponent } from './detalhes-paciente-home.component';

describe('DetalhesPacienteHomeComponent', () => {
  let component: DetalhesPacienteHomeComponent;
  let fixture: ComponentFixture<DetalhesPacienteHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesPacienteHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesPacienteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
