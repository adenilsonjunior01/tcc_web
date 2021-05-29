import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNovoColaboradorComponent } from './card-novo-colaborador.component';

describe('CardNovoColaboradorComponent', () => {
  let component: CardNovoColaboradorComponent;
  let fixture: ComponentFixture<CardNovoColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardNovoColaboradorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNovoColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
