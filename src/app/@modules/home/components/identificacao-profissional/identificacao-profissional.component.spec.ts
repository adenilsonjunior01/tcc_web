import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificacaoProfissionalComponent } from './identificacao-profissional.component';

describe('IdentificacaoProfissionalComponent', () => {
  let component: IdentificacaoProfissionalComponent;
  let fixture: ComponentFixture<IdentificacaoProfissionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentificacaoProfissionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificacaoProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
