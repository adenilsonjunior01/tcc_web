import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticasPacienteComponent } from './estatisticas-paciente.component';

describe('EstatisticasPacienteComponent', () => {
    let component: EstatisticasPacienteComponent;
    let fixture: ComponentFixture<EstatisticasPacienteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EstatisticasPacienteComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EstatisticasPacienteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
