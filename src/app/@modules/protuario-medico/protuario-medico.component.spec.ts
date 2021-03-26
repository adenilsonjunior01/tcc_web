import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtuarioMedicoComponent } from './protuario-medico.component';

describe('ProtuarioMedicoComponent', () => {
  let component: ProtuarioMedicoComponent;
  let fixture: ComponentFixture<ProtuarioMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProtuarioMedicoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtuarioMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
