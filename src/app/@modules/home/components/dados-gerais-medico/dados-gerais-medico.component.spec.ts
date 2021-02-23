import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosGeraisMedicoComponent } from './dados-gerais-medico.component';

describe('DadosGeraisMedicoComponent', () => {
  let component: DadosGeraisMedicoComponent;
  let fixture: ComponentFixture<DadosGeraisMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosGeraisMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosGeraisMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
