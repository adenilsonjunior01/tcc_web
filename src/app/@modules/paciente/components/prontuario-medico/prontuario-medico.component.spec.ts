import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProntuarioMedicoComponent } from './prontuario-medico.component';

describe('ProntuarioMedicoComponent', () => {
  let component: ProntuarioMedicoComponent;
  let fixture: ComponentFixture<ProntuarioMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProntuarioMedicoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProntuarioMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
