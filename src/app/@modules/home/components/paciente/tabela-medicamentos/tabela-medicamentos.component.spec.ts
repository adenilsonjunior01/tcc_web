import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaMedicamentosComponent } from './tabela-medicamentos.component';

describe('TabelaMedicamentosComponent', () => {
  let component: TabelaMedicamentosComponent;
  let fixture: ComponentFixture<TabelaMedicamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabelaMedicamentosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
