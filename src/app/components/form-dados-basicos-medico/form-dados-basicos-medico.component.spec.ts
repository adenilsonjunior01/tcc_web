import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDadosBasicosMedicoComponent } from './form-dados-basicos-medico.component';

describe('FormDadosBasicosMedicoComponent', () => {
  let component: FormDadosBasicosMedicoComponent;
  let fixture: ComponentFixture<FormDadosBasicosMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDadosBasicosMedicoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDadosBasicosMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
