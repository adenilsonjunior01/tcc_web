import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsEstatisticasMedicoComponent } from './estatisticas-medico.component';

describe('ChartsEstatisticasMedicoComponent', () => {
  let component: ChartsEstatisticasMedicoComponent;
  let fixture: ComponentFixture<ChartsEstatisticasMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartsEstatisticasMedicoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsEstatisticasMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
