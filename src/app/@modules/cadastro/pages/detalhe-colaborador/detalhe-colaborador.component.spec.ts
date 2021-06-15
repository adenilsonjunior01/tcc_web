import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheColaboradorComponent } from './detalhe-colaborador.component';

describe('DetalheColaboradorComponent', () => {
    let component: DetalheColaboradorComponent;
    let fixture: ComponentFixture<DetalheColaboradorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DetalheColaboradorComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DetalheColaboradorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
