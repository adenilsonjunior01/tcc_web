import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDadosClinicaComponent } from './form-dados-clinica.component';

describe('FormDadosClinicaComponent', () => {
  let component: FormDadosClinicaComponent;
  let fixture: ComponentFixture<FormDadosClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDadosClinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDadosClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
