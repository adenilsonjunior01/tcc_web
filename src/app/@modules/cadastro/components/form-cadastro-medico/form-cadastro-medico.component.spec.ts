import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadastroMedicoComponent } from './form-cadastro-medico.component';

describe('FormCadastroMedicoComponent', () => {
  let component: FormCadastroMedicoComponent;
  let fixture: ComponentFixture<FormCadastroMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCadastroMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCadastroMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
