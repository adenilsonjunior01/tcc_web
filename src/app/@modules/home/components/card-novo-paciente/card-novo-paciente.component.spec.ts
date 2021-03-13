import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNovoPacienteComponent } from './card-novo-paciente.component';

describe('CardNovoPacienteComponent', () => {
  let component: CardNovoPacienteComponent;
  let fixture: ComponentFixture<CardNovoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardNovoPacienteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNovoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
