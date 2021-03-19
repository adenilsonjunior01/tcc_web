import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDadosBasicosUsuarioComponent } from './form-dados-basicos-usuario.component';

describe('FormDadosBasicosUsuarioComponent', () => {
  let component: FormDadosBasicosUsuarioComponent;
  let fixture: ComponentFixture<FormDadosBasicosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDadosBasicosUsuarioComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDadosBasicosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
