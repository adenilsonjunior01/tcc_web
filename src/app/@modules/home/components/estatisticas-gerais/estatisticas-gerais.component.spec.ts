import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticasGeraisComponent } from './estatisticas-gerais.component';

describe('EstatisticasGeraisComponent', () => {
  let component: EstatisticasGeraisComponent;
  let fixture: ComponentFixture<EstatisticasGeraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstatisticasGeraisComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatisticasGeraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
