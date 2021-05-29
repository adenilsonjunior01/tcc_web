import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaDiagnosticosDataComponent } from './tabela-diagnosticos-data.component';

describe('TabelaDiagnosticosDataComponent', () => {
  let component: TabelaDiagnosticosDataComponent;
  let fixture: ComponentFixture<TabelaDiagnosticosDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabelaDiagnosticosDataComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaDiagnosticosDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
