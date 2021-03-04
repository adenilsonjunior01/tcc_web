import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavRigthComponent } from './nav-rigth.component';

describe('NavRigthComponent', () => {
  let component: NavRigthComponent;
  let fixture: ComponentFixture<NavRigthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavRigthComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavRigthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
