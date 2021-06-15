import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitativoUsuariosComponent } from './quantitativo-usuarios.component';

describe('QuantitativoUsuariosComponent', () => {
    let component: QuantitativoUsuariosComponent;
    let fixture: ComponentFixture<QuantitativoUsuariosComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [QuantitativoUsuariosComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QuantitativoUsuariosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
