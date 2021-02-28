import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadastroEspecialidadeComponent } from './form-cadastro-especialidade.component';

describe('FormCadastroEspecialidadeComponent', () => {
  let component: FormCadastroEspecialidadeComponent;
  let fixture: ComponentFixture<FormCadastroEspecialidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCadastroEspecialidadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCadastroEspecialidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
