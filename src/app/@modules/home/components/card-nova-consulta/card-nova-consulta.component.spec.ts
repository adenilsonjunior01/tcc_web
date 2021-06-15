import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNovaConsultaComponent } from './card-nova-consulta.component';

describe('CardNovaConsultaComponent', () => {
    let component: CardNovaConsultaComponent;
    let fixture: ComponentFixture<CardNovaConsultaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CardNovaConsultaComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CardNovaConsultaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
