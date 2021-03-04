import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadastroColaboradorComponent } from './form-cadastro-colaborador.component';

describe('FormCadastroColaboradorComponent', () => {
  let component: FormCadastroColaboradorComponent;
  let fixture: ComponentFixture<FormCadastroColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCadastroColaboradorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCadastroColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
