import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitativoDadosClinicaComponent } from './quantitativo-dados-clinica.component';

describe('QuantitativoDadosClinicaComponent', () => {
  let component: QuantitativoDadosClinicaComponent;
  let fixture: ComponentFixture<QuantitativoDadosClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuantitativoDadosClinicaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantitativoDadosClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
