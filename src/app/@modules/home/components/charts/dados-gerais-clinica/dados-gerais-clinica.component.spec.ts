import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosGeraisClinicaComponent } from './dados-gerais-clinica.component';

describe('DadosGeraisClinicaComponent', () => {
    let component: DadosGeraisClinicaComponent;
    let fixture: ComponentFixture<DadosGeraisClinicaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DadosGeraisClinicaComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DadosGeraisClinicaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
