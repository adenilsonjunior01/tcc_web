import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemiDonoutProcedimentoComponent } from './semi-donout-procedimento.component';

describe('SemiDonoutProcedimentoComponent', () => {
  let component: SemiDonoutProcedimentoComponent;
  let fixture: ComponentFixture<SemiDonoutProcedimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SemiDonoutProcedimentoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemiDonoutProcedimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
